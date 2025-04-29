export interface Auditable {
  createdBy: string;
  createdDate: Date | null;
  updatedBy?: string | null;
  updatedDate?: Date | null;
  deletedBy?: string | null;
  deletedDate?: Date | null;
}
