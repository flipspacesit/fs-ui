import React from "react";
import { Box, Typography } from "@mui/material";
import { DocSection, ExampleBox, PropsTable } from "../components/DocSection";
import CodeBlock from "../components/CodeBlock";
import {
  DataTable,
  useColumnResize,
  ColumnResizer,
  StyledTable,
  StyledTableHead,
  StyledTableBody,
  StyledHeaderCell,
  StyledTableRow,
  StyledTableCell,
  StyledTableContainer,
  type DataTableColumn,
  type DataTableRow,
} from "../../../src";

interface Employee {
  id: number;
  name: string;
  email: string;
  department: string;
  salary: number;
  joined: string;
  status: string;
}

const sampleData: Employee[] = [
  { id: 1, name: "John Doe", email: "john@example.com", department: "Design", salary: 82000, joined: "2021-03-14", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", department: "Engineering", salary: 118000, joined: "2019-07-02", status: "Active" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", department: "Sales", salary: 74000, joined: "2022-11-20", status: "Inactive" },
  { id: 4, name: "Alice Brown", email: "alice@example.com", department: "Engineering", salary: 96000, joined: "2020-01-09", status: "Active" },
  { id: 5, name: "Charlie Green", email: "charlie@example.com", department: "Design", salary: 68000, joined: "2023-05-30", status: "Pending" },
  { id: 6, name: "Dana White", email: "dana@example.com", department: "Sales", salary: 88000, joined: "2018-09-12", status: "Active" },
];

const columns: DataTableColumn<Employee>[] = [
  { field: "name", header: "Name", width: 150, resizable: true, showFilter: true },
  { field: "email", header: "Email", width: 220, resizable: true, showFilter: true },
  { field: "department", header: "Department", width: 150, resizable: true, showFilter: true },
  { field: "salary", header: "Salary", width: 130, type: "currency", resizable: true, showTotal: true, bodyAlign: "right", totalAlign: "right" },
  { field: "joined", header: "Joined", width: 130, type: "date", resizable: true, showFilter: true },
  { field: "status", header: "Status", width: 120, resizable: true, showFilter: true },
];

const ExampleFrame: React.FC<{ height?: number; children: React.ReactNode }> = ({
  height = 320,
  children,
}) => (
  // fs-ui components scale off `--scale`; the DataTable falls back to 1, we set
  // it explicitly here so the docs preview matches a real consumer app.
  <Box sx={{ height, width: "100%", "--scale": 1 } as React.CSSProperties}>
    {children}
  </Box>
);

/** Small standalone example: column resizing on the low-level StyledTable. */
const ResizeHookExample: React.FC = () => {
  const { getColumnWidth, startColumnResize } = useColumnResize();
  const cols = columns.slice(0, 4);

  return (
    <StyledTableContainer sx={{ maxHeight: 260, ["--scale" as string]: 1 }}>
      <StyledTable stickyHeader>
        <StyledTableHead>
          <StyledTableRow>
            {cols.map((col) => (
              <StyledHeaderCell
                key={col.field}
                sx={{
                  position: "relative",
                  width: getColumnWidth(col),
                  minWidth: getColumnWidth(col),
                }}
              >
                {col.header}
                <ColumnResizer
                  onMouseDown={(event) =>
                    startColumnResize(col.field, getColumnWidth(col), event)
                  }
                />
              </StyledHeaderCell>
            ))}
          </StyledTableRow>
        </StyledTableHead>
        <StyledTableBody>
          {sampleData.map((row) => (
            <StyledTableRow key={row.id}>
              {cols.map((col) => (
                <StyledTableCell key={col.field}>
                  {String(row[col.field as keyof Employee])}
                </StyledTableCell>
              ))}
            </StyledTableRow>
          ))}
        </StyledTableBody>
      </StyledTable>
    </StyledTableContainer>
  );
};

const PAGE_SIZE = 15;
const MAX_ROWS = 90;

/** Fabricate a page of rows by cycling the sample records with fresh ids. */
const makePage = (startId: number, count: number): Employee[] =>
  Array.from({ length: count }, (_unused, i) => {
    const id = startId + i;
    const template = sampleData[(id - 1) % sampleData.length];
    return { ...template, id, name: `${template.name} #${id}` };
  });

/**
 * Infinite scroll + auto skeletons. Starts empty with `isLoading` on (initial
 * skeleton page), then pages in more rows each time you reach the bottom —
 * skeleton rows fill the gap while the next page "loads".
 */
const InfiniteScrollExample: React.FC = () => {
  const [rows, setRows] = React.useState<Employee[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const inFlight = React.useRef(false);

  const loadNextPage = React.useCallback(() => {
    if (inFlight.current) return;
    inFlight.current = true;
    setIsLoading(true);
    // Simulate a network round-trip.
    window.setTimeout(() => {
      setRows((prev) => [...prev, ...makePage(prev.length + 1, PAGE_SIZE)]);
      setIsLoading(false);
      inFlight.current = false;
    }, 900);
  }, []);

  React.useEffect(() => {
    loadNextPage(); // initial load
  }, [loadNextPage]);

  return (
    <ExampleFrame height={360}>
      <DataTable
        data={rows}
        columns={columns}
        rowKey={(row) => row.id}
        allowInfiniteScroll
        isLoading={isLoading}
        onRefetch={() => {
          if (rows.length < MAX_ROWS) loadNextPage();
        }}
      />
    </ExampleFrame>
  );
};

/** Per-row styling via a `bodyRowSx` factory (works under virtualization). */
const RowStylingExample: React.FC = () => (
  <ExampleFrame>
    <DataTable
      data={sampleData}
      columns={columns}
      rowKey={(row) => row.id}
      bodyRowSx={(row: DataTableRow) => ({
        "& td": {
          backgroundColor:
            row.status === "Inactive"
              ? "#fdecea !important"
              : row.status === "Pending"
                ? "#fff7e6 !important"
                : "inherit",
        },
      })}
    />
  </ExampleFrame>
);

const DataTableDocs: React.FC = () => (
  <Box>
    <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
      DataTable
    </Typography>
    <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
      A data-driven table with resizable columns, sticky &amp; frozen columns,
      per-column filtering and sorting, a totals row, and optional row
      virtualization. Pass <code>columns</code> and <code>data</code> and the
      component handles the rest — or compose the underlying primitives
      (<code>useColumnResize</code>, <code>ColumnResizer</code>, the styled
      cells) onto your own table.
    </Typography>

    <DocSection title="Import">
      <CodeBlock
        code={`import { DataTable, type DataTableColumn } from '@flipspacesit/fs-ui';`}
      />
    </DocSection>

    <DocSection title="Basic usage">
      <Typography variant="body2" sx={{ mb: 2 }}>
        Define your columns, then hand the component your rows. Each column needs
        a <code>field</code>; everything else is optional.
      </Typography>
      <ExampleBox>
        <ExampleFrame>
          <DataTable
            data={sampleData}
            columns={columns}
            rowKey={(row) => row.id}
          />
        </ExampleFrame>
      </ExampleBox>
      <CodeBlock
        code={`const columns: DataTableColumn<Employee>[] = [
  { field: 'name', header: 'Name', width: 150 },
  { field: 'email', header: 'Email', width: 220 },
  { field: 'salary', header: 'Salary', width: 130, type: 'currency', bodyAlign: 'right' },
  { field: 'joined', header: 'Joined', width: 130, type: 'date' },
  { field: 'status', header: 'Status', width: 120 },
]

<DataTable data={rows} columns={columns} rowKey={(row) => row.id} />`}
      />
    </DocSection>

    <DocSection title="Column resizing">
      <Typography variant="body2" sx={{ mb: 2 }}>
        Set <code>columnResizable</code> on the table and <code>resizable</code> on
        each column you want draggable. A handle appears on the right edge of the
        header — drag it to resize (columns clamp to a 60px minimum). This is the
        capability extracted from the VizDom DataTable wrapper.
      </Typography>
      <ExampleBox>
        <ExampleFrame>
          <DataTable
            data={sampleData}
            columns={columns}
            columnResizable
            rowKey={(row) => row.id}
          />
        </ExampleFrame>
      </ExampleBox>
      <CodeBlock
        code={`const columns = [
  { field: 'name', header: 'Name', width: 150, resizable: true },
  { field: 'email', header: 'Email', width: 220, resizable: true },
  // ...
]

<DataTable data={rows} columns={columns} columnResizable />`}
      />
    </DocSection>

    <DocSection title="Filtering & sorting">
      <Typography variant="body2" sx={{ mb: 2 }}>
        Turn on <code>showFilters</code> and flag columns with{" "}
        <code>showFilter</code>. A funnel appears in the header that opens a
        popover to sort A–Z / Z–A, filter by value (checkbox list of distinct
        values), or filter by condition (operators like contains, equals,
        greater-than). Right-click the funnel to freeze up to that column.
      </Typography>
      <ExampleBox>
        <ExampleFrame>
          <DataTable
            data={sampleData}
            columns={columns}
            showFilters
            rowKey={(row) => row.id}
          />
        </ExampleFrame>
      </ExampleBox>
      <CodeBlock
        code={`const columns = [
  { field: 'department', header: 'Department', showFilter: true },
  { field: 'status', header: 'Status', showFilter: true },
  // ...
]

<DataTable data={rows} columns={columns} showFilters />`}
      />
    </DocSection>

    <DocSection title="Frozen (sticky) columns">
      <Typography variant="body2" sx={{ mb: 2 }}>
        Freeze the leading columns so they stay pinned while the rest scroll
        horizontally. Seed with <code>defaultFrozenColumns</code>, or let users
        freeze/unfreeze from the header right-click menu. Frozen columns compute
        their sticky offset from the (possibly resized) widths to their left.
      </Typography>
      <ExampleBox>
        <ExampleFrame>
          <DataTable
            data={sampleData}
            columns={columns}
            columnResizable
            allowFreezeColumns
            defaultFrozenColumns={["name"]}
            rowKey={(row) => row.id}
          />
        </ExampleFrame>
      </ExampleBox>
      <CodeBlock
        code={`<DataTable
  data={rows}
  columns={columns}
  defaultFrozenColumns={['name']}
  allowFreezeColumns
/>`}
      />
    </DocSection>

    <DocSection title="Totals row">
      <Typography variant="body2" sx={{ mb: 2 }}>
        Add a summary row with <code>showTotalRow</code> and mark the numeric
        columns to sum with <code>showTotal</code>. Place it under the header
        (default) or in a sticky footer via <code>totalRowPlacement</code>.
      </Typography>
      <ExampleBox>
        <ExampleFrame>
          <DataTable
            data={sampleData}
            columns={columns}
            showTotalRow
            totalRowPlacement="footer"
            rowKey={(row) => row.id}
          />
        </ExampleFrame>
      </ExampleBox>
      <CodeBlock
        code={`const columns = [
  { field: 'salary', header: 'Salary', type: 'currency', showTotal: true },
  // ...
]

<DataTable data={rows} columns={columns} showTotalRow totalRowPlacement="footer" />`}
      />
    </DocSection>

    <DocSection title="Virtualization">
      <Typography variant="body2" sx={{ mb: 2 }}>
        Row virtualization (via <code>react-virtuoso</code>) is on by default so
        large datasets stay smooth — the header stays fixed while rows recycle.
        Give the table a bounded height. Set{" "}
        <code>enableVirtualization={"{false}"}</code> to render a plain scrolling
        table for small datasets.
      </Typography>
      <ExampleBox>
        <ExampleFrame height={300}>
          <DataTable
            data={sampleData}
            columns={columns}
            columnResizable
            enableVirtualization
            rowKey={(row) => row.id}
          />
        </ExampleFrame>
      </ExampleBox>
      <CodeBlock
        code={`// bounded-height parent is required for virtualization
<Box sx={{ height: 480 }}>
  <DataTable data={largeDataset} columns={columns} enableVirtualization />
</Box>`}
      />
    </DocSection>

    <DocSection title="Loading & infinite scroll">
      <Typography variant="body2" sx={{ mb: 2 }}>
        Set <code>allowInfiniteScroll</code> and give the table an{" "}
        <code>onRefetch</code> callback — it fires as the user nears the bottom
        so you can fetch the next page. Pass <code>isLoading</code> and the table
        renders skeleton rows for you: a full page while it's empty, then a few
        appended to the bottom while the next page loads. No separate skeleton
        component or loading flag plumbing on your side.{" "}
        <code>onRefetch</code> is guarded by <code>isLoading</code> (it won't
        re-fire mid-load); you decide when there are no more pages — here it
        simply stops calling once a cap is hit.
      </Typography>
      <ExampleBox>
        <InfiniteScrollExample />
      </ExampleBox>
      <CodeBlock
        code={`const { data, fetchNextPage, hasNextPage, isFetching } = useInfiniteQuery(/* ... */)

<DataTable
  data={data}
  columns={columns}
  allowInfiniteScroll
  isLoading={isFetching}
  onRefetch={() => {
    if (hasNextPage) fetchNextPage()
  }}
/>`}
      />
    </DocSection>

    <DocSection title="Row & cell styling">
      <Typography variant="body2" sx={{ mb: 2 }}>
        Style rows and cells with <code>bodyRowSx</code> /{" "}
        <code>bodyCellSx</code> — either a static <code>sx</code> or a factory
        that receives the row (and, for cells, the column) so you can style
        conditionally. Both apply whether virtualization is on or off. Below,{" "}
        <code>bodyRowSx</code> tints rows by status.
      </Typography>
      <ExampleBox>
        <RowStylingExample />
      </ExampleBox>
      <CodeBlock
        code={`<DataTable
  data={rows}
  columns={columns}
  bodyRowSx={(row) =>
    row.status === 'Inactive'
      ? { '& td': { backgroundColor: '#fdecea !important' } }
      : {}
  }
/>`}
      />
    </DocSection>

    <DocSection title="Composing the primitives">
      <Typography variant="body2" sx={{ mb: 2 }}>
        Prefer to keep your own table markup? The resize engine ships as a
        standalone hook plus a drag handle. <code>useColumnResize</code> owns the
        width map and a <code>startColumnResize</code> handler; drop the exported{" "}
        <code>ColumnResizer</code> onto any (position-relative) header cell —
        including the low-level <code>StyledTable</code> primitives.
      </Typography>
      <ExampleBox>
        <ResizeHookExample />
      </ExampleBox>
      <CodeBlock
        code={`import { useColumnResize, ColumnResizer, StyledTable, StyledHeaderCell } from '@flipspacesit/fs-ui'

function MyTable() {
  const { getColumnWidth, startColumnResize } = useColumnResize()

  return (
    <StyledTable>
      <thead>
        <tr>
          {columns.map((col) => (
            <StyledHeaderCell
              key={col.field}
              sx={{ position: 'relative', width: getColumnWidth(col) }}
            >
              {col.header}
              <ColumnResizer
                onMouseDown={(e) => startColumnResize(col.field, getColumnWidth(col), e)}
              />
            </StyledHeaderCell>
          ))}
        </tr>
      </thead>
      {/* ...body... */}
    </StyledTable>
  )
}`}
      />
    </DocSection>

    <DocSection title="DataTable props">
      <PropsTable
        props={[
          { name: "data", type: "Row[]", default: "[]", description: "The rows to render." },
          { name: "columns", type: "DataTableColumn<Row>[]", default: "[]", description: "Column definitions (see the table below)." },
          { name: "rowKey", type: "(row, index) => Key", default: "row.id ?? row.key ?? index", description: "Stable per-row React key." },
          { name: "columnResizable", type: "boolean", default: "false", description: "Master switch for column resizing; columns opt in via column.resizable." },
          { name: "minColumnWidth", type: "number", default: "60", description: "Minimum width (px) a column can be dragged to." },
          { name: "showFilters", type: "boolean", default: "false", description: "Show the per-column filter/sort funnel (columns opt in via column.showFilter)." },
          { name: "showTotalRow", type: "boolean", default: "false", description: "Render the totals summary row." },
          { name: "totalRowPlacement", type: "'header' | 'footer'", default: "'header'", description: "Where the totals row sits." },
          { name: "showTotalWithCurrencyDropdown", type: "boolean", default: "false", description: "Show a currency selector in the totals row and total only the selected currency." },
          { name: "showControlRow", type: "boolean", default: "false", description: "Render the control row with expand toggles for expandable column groups." },
          { name: "allowHideColumns", type: "boolean", default: "true", description: "Allow 'Hide Column' from the header popover." },
          { name: "allowFreezeColumns", type: "boolean", default: "true", description: "Allow freeze/unfreeze from the header right-click menu." },
          { name: "defaultFrozenColumns", type: "string[]", default: "[]", description: "Fields frozen (pinned left) on mount." },
          { name: "defaultHiddenColumns", type: "Record<string, boolean>", default: "{}", description: "Fields hidden on mount." },
          { name: "defaultFilters", type: "ActiveFilters", default: "{}", description: "Filters applied on mount." },
          { name: "defaultSortConfig", type: "SortConfig", default: "{ key: null, direction: null }", description: "Sort applied on mount." },
          { name: "defaultColumnWidths", type: "Record<string, number>", default: "{}", description: "Seed runtime column widths (field → px)." },
          { name: "fieldMappings", type: "FieldMappings", default: "{}", description: "Map a column's filter to one or more source fields." },
          { name: "dateFormat", type: "string", default: "'DD MMM YYYY'", description: "dayjs format for date columns." },
          { name: "emptyMessage", type: "string", default: "'No records found'", description: "Empty-state message." },
          { name: "enableVirtualization", type: "boolean", default: "true", description: "Use react-virtuoso row virtualization (needs a bounded height)." },
          { name: "allowInfiniteScroll", type: "boolean", default: "false", description: "Fire onRefetch as the user nears the bottom (works with or without virtualization)." },
          { name: "onRefetch", type: "() => void", description: "Called at the bottom to fetch more; guarded by isLoading (won't re-fire mid-load)." },
          { name: "isLoading", type: "boolean", default: "false", description: "Render skeleton rows: a full page when empty, or a few appended while paging." },
          { name: "skeletonRowCount", type: "number", default: "8", description: "Skeleton rows shown for the initial (empty) loading state." },
          { name: "bodyRowSx", type: "SxProps | (row, index) => SxProps", description: "Per-row sx (static or factory). Applies in both virtualized and plain modes." },
          { name: "bodyCellSx", type: "SxProps | (column, row, index) => SxProps", description: "Per-cell sx (static or factory)." },
          { name: "onTableApiChange", type: "(api: DataTableApi) => void", description: "Receive the imperative state/setters snapshot." },
          { name: "onStateChange", type: "(api: DataTableApi) => void", description: "Called whenever the table's derived state changes." },
          { name: "renderRow", type: "(params) => ReactNode", description: "Override how a body row renders (non-virtualized)." },
        ]}
      />
    </DocSection>

    <DocSection title="DataTableColumn config">
      <PropsTable
        props={[
          { name: "field", type: "string", required: true, description: "Row key this column reads; also its identity for width/filter/sort state." },
          { name: "header", type: "ReactNode", description: "Header label. Use renderHeader for custom nodes." },
          { name: "width", type: "number", default: "120", description: "Base width in px (before --scale); resizing overrides this at runtime." },
          { name: "type", type: "'text' | 'number' | 'currency' | 'date'", default: "'text'", description: "Value interpretation for formatting, filtering and totals." },
          { name: "resizable", type: "boolean", default: "false", description: "Show the drag handle when the table has columnResizable." },
          { name: "showFilter", type: "boolean", default: "false", description: "Show the filter/sort funnel in the header." },
          { name: "showTotal", type: "boolean", default: "false", description: "Include this column's numeric sum in the totals row." },
          { name: "bodyAlign / headerAlign / totalAlign", type: "'left' | 'center' | 'right'", description: "Per-section cell alignment." },
          { name: "render", type: "(params) => ReactNode", description: "Custom body-cell renderer; bypasses default formatting." },
          { name: "renderHeader / renderTotal", type: "(params) => ReactNode", description: "Custom header / totals-cell renderers." },
          { name: "expandable / expandedColumns", type: "boolean / DataTableColumn[]", description: "Expandable column group and its revealed child columns (with showControlRow)." },
        ]}
      />
    </DocSection>

    <DocSection title="Exported primitives">
      <PropsTable
        props={[
          { name: "DataTable", type: "component", description: "The assembled data-driven table." },
          { name: "useColumnResize", type: "hook", description: "Column-width map + startColumnResize handler. Standalone; pair with ColumnResizer." },
          { name: "useDataTableState", type: "hook", description: "All derived table state (filter/sort/freeze/expand/currency/widths)." },
          { name: "ColumnResizer", type: "styled(Box)", description: "The drag handle; wire its onMouseDown to startColumnResize." },
          { name: "StyledDataTable / DataTableHeaderCell / DataTableBodyCell / DataTableTotalCell", type: "styled", description: "Width- and sticky-aware styled cells for building custom tables." },
          { name: "normalizeColumns / getColumnWidth / formatCellValue / applyFiltersAndSort / calculateTotals", type: "utils", description: "The pure helpers behind the component." },
        ]}
      />
    </DocSection>
  </Box>
);

export default DataTableDocs;
