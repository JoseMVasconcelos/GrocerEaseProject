import jwtDecode from 'jwt-decode'

interface DecodedTokenType {
  userId: string
  username: string
  email: string
}

export function decodeJWTToken(token: string) {
  const {
    userId: id,
    username: name,
    email,
  } = jwtDecode<DecodedTokenType>(token)

  return {
    id,
    name,
    email,
  }
}
