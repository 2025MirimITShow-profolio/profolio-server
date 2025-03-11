import { AuthGuard } from "@nestjs/passport";

export class LocalAuthGuard extends AuthGuard('local'){}
// 로그인할 때 이메일, 비밀번호 검증