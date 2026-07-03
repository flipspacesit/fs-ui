export { Add } from "./Add";
export { AddFloor } from "./AddFloor";
export { AirplaneTilt } from "./AirplaneTilt";
export { ArrowDown } from "./ArrowDown";
export { ArrowDown2 } from "./ArrowDown2";
export { ArrowLeft } from "./ArrowLeft";
export { ArrowLeft2 } from "./ArrowLeft2";
export { ArrowRight } from "./ArrowRight";
export { ArrowUp } from "./ArrowUp";
export { Bank } from "./Bank";
export { Building } from "./Building";
export { CalendarBlank } from "./CalendarBlank";
export { Cardholder } from "./Cardholder";
export { CheckIcon } from "./Check";
export { CheckCircle } from "./CheckCircle";
export { CheckCircle2 } from "./CheckCircle2";
export { CheckRectangle } from "./CheckRectangle";
export { CheckSquareOffset } from "./CheckSquareOffset";
export { CloseIcon } from "./Close";
export { CreditCard } from "./CreditCard";
export { CurrencyInr } from "./CurrencyInr";
export { CurrencyInr2 } from "./CurrencyInr2";
export { Download } from "./Download";
export { ErrorIcon } from "./Error";
export { EqualtoCircle } from "./EqualtoCircle";
export { FileText } from "./FileText";
export { FillInfo } from "./FillInfo";
export { FillFileText } from "./FillFileText";
export { FillThumbsDown } from "./FillThumbsDown";
export { FillThumbsUp } from "./FillThumbsUp";
export { FloppyDisk } from "./FloppyDisk";
export { FloorInfo } from "./FloorInfo";
export { FullScreen } from "./FullScreen";
export { Funnel } from "./Funnel";
export { Gear } from "./Gear";
export { IdentificationCard } from "./IdentificationCard";
export { Info } from "./Info";
export { InvoiceUS } from "./InvoiceUS";
export { IndianFlag } from "./IndianFlag";
export { KeyboardArrowDown } from "./KeyboardArrowDown";
export { Logout } from "./Logout";
export { MagnifyingGlass } from "./MagnifyingGlass";
export { MapPin } from "./MapPin";
export { Minus } from "./Minus";
export { MinusCircle } from "./MinusCircle";
export { MinimizeFullScreen } from "./MinimizeFullScreen";
export { NoDataIcon } from "./NoDataIcon";
export { OutlineThumbsDown } from "./OutlineThumbsDown";
export { OutlineThumbsUp } from "./OutlineThumbsUp";
export { PaperPlaneTilt } from "./PaperPlaneTilt";
export { PdfFile } from "./PdfFile";
export { Pencil } from "./Pencil";
export { PlusCircle } from "./PlusCircle";
export { PencilSimpleLine } from "./PencilSimpleLine";
export { Phone } from "./Phone";
export { QuestionMark } from "./QuestionMark";
export { Refresh } from "./Refresh";
export { Repeat } from "./Repeat";
export { RequestPayment } from "./RequestPayment";
export { Scroll } from "./Scroll";
export { Scroll2 } from "./Scroll2";
export { SealCheck } from "./SealCheck";
export { ShieldCheck } from "./ShieldCheck";
export { ShoppingCart } from "./ShoppingCart";
export { Storefront } from "./Storefront";
export { Subtitles } from "./Subtitles";
export { Success } from "./Success";
export { Trash } from "./Trash";
export { Trash2 } from "./Trash2";
export { TrayArrowUp } from "./TrayArrowUp";
export { UploadSimple } from "./UploadSimple";
export { UserCircle } from "./UserCircle";
export { UserPlus } from "./UserPlus";
export { VendorIcon } from "./VendorIcon";
export { Warning } from "./Warning";
export { Warning2 } from "./Warning2";
export { Vizdom } from "./Vizdom";
export { ArrowLineDown } from "./ArrowLineDown";
export { Folder } from "./Folder";
export { OutlineQuestionMark } from "./OutlineQuestionMark";
export { Ticket } from "./Ticket";
export { Email } from "./Email";
export { FillBulb } from "./FillBulb";
export { OutlineBulb } from "./OutlineBulb";
export { Percentage } from "./Percentage";
export { Receipt } from "./Receipt";
export { ListChecks } from "./ListChecks";
export { ClipboardText } from "./ClipboardText";
export { Certificate } from "./Certificate";
export { Users } from "./Users";

// ---------------------------------------------------------------------------
// Phosphor Icons — the full @phosphor-icons/react set (~1,512 icons, each with
// thin / light / regular / bold / fill / duotone weights). Re-exported wholesale
// so every Phosphor icon is importable straight from `@flipspacesit/fs-ui`.
//
// The hand-authored icons above are EXPLICIT named exports, so per ES-module
// semantics they shadow their Phosphor namesakes (ArrowDown, CheckCircle,
// Funnel, MagnifyingGlass, Trash, Users, …) with no ambiguity — importing those
// names keeps the existing fs-ui glyph and `{ size, color | fill }` API exactly
// as before. Likewise the component exports in ../index.ts (Table, Tag, Tabs,
// Tree, Calendar, RadioButton) shadow the Phosphor icons of the same name at the
// package root. New Phosphor icons use Phosphor's own `<Icon size weight color />`
// API (see IconContext / IconProps / IconWeight, also re-exported here).
//
// `@phosphor-icons/react` is externalized in vite.config.ts, so it is NOT bundled
// into fs-ui's dist — consumers' bundlers tree-shake it and only pull the icons
// they actually import.
// ---------------------------------------------------------------------------
export * from "@phosphor-icons/react";
