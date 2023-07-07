# Authentication with NestJS and JWT
Project sử dụng package `@nest/jwt`, trong đó có có các tính năng đầy đủ để có thể phát triển các phương thức xác thực người dùng.  
## JWT - Json web token
Trong xác thực người dùng bằng jwt, sẽ có hai loại token được tạo ra là refreshtoken và accesstoken:
- accesstoken: được gửi trong mỗi request từ người dùng, để truy cập các tài nguyên yêu cầu xác thực người dùng. Có thời gian sống ngắn, thường rơi vào khoảng 30'.
- refreshtoken: một token được lưu trữ trên browser người dùng, sẽ được dùng để cấp mới accesstoken mỗi khi chúng hết hạn.
1. Tạo token
- Thư viện `@nest/jwt` cung cấp một lớp `jwtService` có chứng năng tạo các token:
```ts
const [token, refreshToken] = await Promise.all([
    await this.jwtService.signAsync(
    {
        id: data.id,
        role: data.role,
        sessionId: data.sessionId,
    },
    {
        secret: this.configService.getOrThrow<string>('auth.secret', {
        infer: true,
        }),
        expiresIn: tokenExpiresIn,
    },
    ),
    await this.jwtService.signAsync(
    {
        sessionId: data.sessionId,
    },
    {
        secret: this.configService.getOrThrow<string>('auth.refreshSecret', {
        infer: true,
        }),
        expiresIn: this.configService.getOrThrow<string>(
        'auth.refreshExpires',
        { infer: true },
        ),
    },
    ),
]);
```

Trong đoạn ví dụ trên: 
- Bằng cách truyền payload bao gồm `session_id` và các thông tin cơ bản của người dùng. Các thông tin này được dùng khi xác thực người dùng, nhằm giảm tải cho database.
- Các khóa bí mật: `auth.secret` được dùng để mã hóa accesstoken, `auth.refreshExpires` được dùng để mã hóa refreshtoken.
- `sessionId`: dùng để lưu trữ phiên đăng nhập của người dùng, điều này quan trọng khi xác định một token có phải được tạo ra từ server hay không, trong trường hợp bị rò rỉ các khóa thông qua biến môi trường. 
```ts
async refreshToken(
    data: Pick<JwtRefreshPayloadType, 'sessionId'>,
  ): Promise<Omit<LoginResponseType, 'user'>> {
    const session = await this.sessionService.findOne({
      where: {
        id: data.sessionId,
      },
    });
    // ...
  }
```
- SessionId được lưu trong cơ sở dữ liệu, được tạo mới sau mỗi lần đăng nhập thành công:
```ts
  async validateLogin(
    loginDto: AuthEmailLoginDto,
    onlyAdmin: boolean,
  ): Promise<LoginResponseType> {
    const user = await this.usersService.findOne({
      email: loginDto.email,
    });
    // ...
    const isValidPassword = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    // ....
    const session = await this.sessionService.create({
      user,
    });
  }
```
Và được vô hiệu sau khi logout:
```ts
async logout(data: Pick<JwtRefreshPayloadType, 'sessionId'>) {
    return this.sessionService.softDelete({
      id: data.sessionId,
    });
  }
```
