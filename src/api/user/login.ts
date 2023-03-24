import http from '@/core/http'

export const uploadJsError = (params: UserType.UploadJsErrorReq) =>
  http.post<UserType.UploadJsErrorReq, UserType.UploadJsErrorRes>('/login', params)
