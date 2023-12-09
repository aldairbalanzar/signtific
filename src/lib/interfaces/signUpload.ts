export interface ISignUpload {
  name: string;
  image: FileList | null;
  video: FileList | null;
  audio: FileList | null;
  audioLang: string;
}