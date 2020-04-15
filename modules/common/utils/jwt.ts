import * as JWT from "jsonwebtoken";

interface JwtSignOptions {
  audience: "user" | "visitor";
  subject: string;
  payload?: object;
  expiresIn?: string;
}

const issuer = process.env.NODE_ENV === "production" ? "prod" : "dev";

function getAudienceSecret(audience: JwtSignOptions["audience"]): string {
  const defaultValue = `default-${audience}-token-secret`;

  if (audience === "user") {
    return process.env.JWT_USER_SECRET || defaultValue;
  }

  if (audience === "visitor") {
    return process.env.JWT_VISITOR_SECRET || defaultValue;
  }

  return null;
}

export function signToken(options: JwtSignOptions): string {
  const { payload, ...restOptions } = options;
  const secret = getAudienceSecret(options.audience);

  return JWT.sign(payload || {}, secret, {
    issuer,
    ...restOptions
  });
}

export function verifyToken(
  token: string,
  audience: JwtSignOptions["audience"]
) {
  const secret = getAudienceSecret(audience);

  return JWT.verify(token, secret, {
    audience: audience,
    issuer
  }) as Record<string, any>;
}
