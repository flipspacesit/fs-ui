import { useSnackbar, VariantType, SnackbarKey, OptionsObject } from "notistack";
import { useCallback } from "react";

export interface NotificationOptions extends Omit<OptionsObject, "variant"> {
  /** Auto hide duration in ms */
  autoHideDuration?: number;
  /** Position of the notification */
  anchorOrigin?: {
    vertical: "top" | "bottom";
    horizontal: "left" | "center" | "right";
  };
}

export interface UseNotificationReturn {
  /** Show a success notification */
  showSuccess: (message: string, options?: NotificationOptions) => SnackbarKey;
  /** Show an error notification */
  showError: (message: string, options?: NotificationOptions) => SnackbarKey;
  /** Show a warning notification */
  showWarning: (message: string, options?: NotificationOptions) => SnackbarKey;
  /** Show an info notification */
  showInfo: (message: string, options?: NotificationOptions) => SnackbarKey;
  /** Show a notification with custom variant */
  showNotification: (
    message: string,
    variant: VariantType,
    options?: NotificationOptions
  ) => SnackbarKey;
  /** Close a specific notification */
  closeNotification: (key?: SnackbarKey) => void;
  /** Close all notifications */
  closeAllNotifications: () => void;
}

const defaultOptions: NotificationOptions = {
  autoHideDuration: 3000,
  anchorOrigin: {
    vertical: "top",
    horizontal: "right",
  },
};

/**
 * Hook for showing notifications using notistack
 *
 * @example
 * ```tsx
 * const { showSuccess, showError } = useNotification();
 *
 * // Show success message
 * showSuccess("Operation completed!");
 *
 * // Show error message
 * showError("Something went wrong");
 *
 * // With custom options
 * showSuccess("Saved!", { autoHideDuration: 5000 });
 * ```
 */
export const useNotification = (): UseNotificationReturn => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const showNotification = useCallback(
    (
      message: string,
      variant: VariantType,
      options?: NotificationOptions
    ): SnackbarKey => {
      return enqueueSnackbar(message, {
        variant,
        ...defaultOptions,
        ...options,
      });
    },
    [enqueueSnackbar]
  );

  const showSuccess = useCallback(
    (message: string, options?: NotificationOptions): SnackbarKey => {
      return showNotification(message, "success", options);
    },
    [showNotification]
  );

  const showError = useCallback(
    (message: string, options?: NotificationOptions): SnackbarKey => {
      return showNotification(message, "error", options);
    },
    [showNotification]
  );

  const showWarning = useCallback(
    (message: string, options?: NotificationOptions): SnackbarKey => {
      return showNotification(message, "warning", options);
    },
    [showNotification]
  );

  const showInfo = useCallback(
    (message: string, options?: NotificationOptions): SnackbarKey => {
      return showNotification(message, "info", options);
    },
    [showNotification]
  );

  const closeNotification = useCallback(
    (key?: SnackbarKey) => {
      closeSnackbar(key);
    },
    [closeSnackbar]
  );

  const closeAllNotifications = useCallback(() => {
    closeSnackbar();
  }, [closeSnackbar]);

  return {
    showSuccess,
    showError,
    showWarning,
    showInfo,
    showNotification,
    closeNotification,
    closeAllNotifications,
  };
};

export default useNotification;
