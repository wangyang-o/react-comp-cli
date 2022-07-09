export interface PreviewProps {
  fileType?: string;
  path?: string;
  fileName?: string;
  size?: string;
  visible?: boolean;
  onClose?: Function;
  onDownload?: Function;
  onRemove?: Function;
}
