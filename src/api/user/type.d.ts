declare namespace UserType {
  type UploadJsErrorReq = {
    username: string
    password: string
  }

  type UploadJsErrorRes = {
    accessToken: string
  }
}
