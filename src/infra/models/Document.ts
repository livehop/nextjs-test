export type KaizenAttachement = {
  id: number;
  data: File;
  isProcessing: boolean;
  size: number;
};

export type KaizenAttachmentDetail = {
  id: number;
  kaizenId: number;
  fileName: string;
  size: number;
};
