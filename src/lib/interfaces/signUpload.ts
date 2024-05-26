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
	video_bucket: string | null;
	audio_bucket: string | null;
	video_file_name: string | null;
	audio_file_name: string | null;
}
