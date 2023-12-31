export interface ISignUploadPayload {
  name: string;
  image: FileList | null;
  video: FileList | null;
  audio: FileList | null;
  audioLang: string;
}

export interface ISignUpload {
  name: string;
  image_url: string | null;
  video_url: string | null;
  audio_url: string | null;
}