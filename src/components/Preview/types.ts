export interface PreviewProps {
  fileType?: string;
  path?: string;
  fileName?: string;
  size?: string;
  visible?: boolean;
  onClose?: () => void;
  onDownload?: () => void;
  onRemove?: () => void;
}
