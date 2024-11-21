declare module 'cloudinary' {
  export interface UploadApiResponse {
    public_id: string;
    secure_url: string;
    format: string;
    resource_type: string;
  }
}
