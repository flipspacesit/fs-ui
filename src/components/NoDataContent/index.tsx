import React from "react";
import { Stack, Typography, SxProps, Theme } from "@mui/material";
import { styled } from "@mui/material/styles";
import { NoDataIcon } from "@/icons";

export interface NoDataContentProps {
  /** The name of the entity/resource that has no data (e.g., "Users", "Orders", "GRNs") */
  entityName: string;
  /** Custom icon to display instead of the default NoDataIcon */
  icon?: React.ReactNode;
  /** Hide the title text completely */
  hideTitle?: boolean;
  /** Optional subtitle text shown below the title/description (defaults to "No data available.") */
  subtitle?: string;
  /** Additional description text shown between title and subtitle */
  description?: string;
  /** Remove vertical padding for compact display */
  compact?: boolean;
  /** Custom title text that overrides the default "No matching {entityName} found" */
  title?: string;
  // Style customization props
  containerSx?: SxProps<Theme>;
  iconWrapperSx?: SxProps<Theme>;
  titleSx?: SxProps<Theme>;
  descriptionSx?: SxProps<Theme>;
  subtitleSx?: SxProps<Theme>;
}

const NoDataContainer = styled(Stack, {
  shouldForwardProp: (prop) => prop !== "compact",
})<{ compact?: boolean }>(({ compact }) => ({
  height: "100%",
  width: "100%",
  justifyContent: "center",
  alignItems: "center",
  paddingBottom: compact ? "0px" : "100px",
  paddingTop: compact ? "0px" : "85px",
}));

const ContentWrapper = styled(Stack)({
  alignItems: "center",
  gap: "10px",
});

export const NoDataContent = ({
  icon,
  hideTitle = false,
  entityName,
  subtitle = "No data available.",
  description,
  compact = false,
  title,
  containerSx,
  iconWrapperSx,
  titleSx,
  descriptionSx,
  subtitleSx,
}: NoDataContentProps) => {
  return (
    <NoDataContainer compact={compact} gap='10px' sx={containerSx}>
      <ContentWrapper sx={iconWrapperSx}>
        {icon || <NoDataIcon />}
        {!hideTitle && (
          <Typography variant='h3' sx={titleSx}>
            {title || `No matching ${entityName} found`}
          </Typography>
        )}
        {description && (
          <Typography variant='b1' sx={descriptionSx}>
            {description}
          </Typography>
        )}
        <Typography variant='h4' fontWeight={400} sx={subtitleSx}>
          {subtitle}
        </Typography>
      </ContentWrapper>
    </NoDataContainer>
  );
};

export default NoDataContent;
