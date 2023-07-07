# Restful APIs
RESTful API (Representational State Transfer API) là một kiến trúc thiết kế cho việc xây dựng các dịch vụ web và giao tiếp giữa các hệ thống thông qua việc sử dụng các phương thức HTTP như GET, POST, PUT, DELETE và PATCH.

RESTful API sử dụng các nguyên tắc và quy ước của REST để định nghĩa cách xây dựng và truy xuất tài nguyên (resources) thông qua các URL (Uniform Resource Locator). Mỗi tài nguyên được đại diện bằng một URL duy nhất và có thể được truy xuất, tạo mới, cập nhật hoặc xóa thông qua các phương thức HTTP tương ứng.

Trong project này restful api dùng để thực hiện các thao tác đăng nhập, lấy và cập nhật dữ liệu.

## @nest/swagger
- Đây là thư viện được chuẩn hóa để có thể sử dụng dễ dàng trên nestjs thông qua các decorator đánh dấu các controller và các method của controller.

```ts
// ...
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('Genders')
@Controller({
  path: 'genders',
  version: '1',
})
export class GenderController {
  constructor(private readonly gendersService: GendersService) {}

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id') id: number): Promise<NullableType<Gender>> {
    return this.gendersService.findOne({ id: +id });
  }
}
```
- Trong đó:
    - `@ApiBearerAuth()` để đánh dấu các routes cần phải xác thực người dùng.
    -  `@ApiTags()` để đánh dấu các routes

- Sau khi cấu hình xong, một route sẽ tự động được tạo để người dùng có thể truy cập trực tiếp từ browser và tương tác với các APIs trên này.

![Swagger](./images/swagger.PNG)

## Auth APIs
1. API đăng nhập
![Admin login](./images/auth-api.PNG)

- Kết quả trả về có định dạng JSON:
```json
{
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZXNzaW9uSWQiOjIsImlhdCI6MTY4ODcxOTMzMiwiZXhwIjoxNjg5OTI4OTMyfQ.0-K_rTKZi8UfA3HVFnIbrdLjjy5P8cqmcaBwNezvVRo",
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6ImFkbWluIiwic2Vzc2lvbklkIjoyLCJpYXQiOjE2ODg3MTkzMzIsImV4cCI6MTY4ODcyMTEzMn0.p6bImChL-R63O-VlvHFVkN0eh2SE4ItHxZpn9MnYJtA",
    "tokenExpires": 1688721132146,
    "user": {
        "id": 1,
        "firstName": "Long",
        "lastName": "VQ",
        "role": "admin",
        "status": "active",
        "createdAt": "2023-07-07T02:00:51.000Z",
        "updatedAt": "2023-07-07T02:05:27.000Z",
        "deletedAt": null,
        "gender": null,
        "job": null,
        "provider": null,
        "address": null,
        "__entity": "User"
    }
}
```

## Query APIs
1. Phân trang danh sách người dùng
![Pagination](./images/query-api.PNG)

- Kết quả được trả về dưới định dạng JSON, ngoài ra còn có thêm trường để xác định thêm các trang tiếp theo:

```json
{
    "data": [
        {
            "id": 1,
            "firstName": "Long",
            "lastName": "VQ",
            "role": "admin",
            "status": "active",
            "createdAt": "2023-07-07T02:00:51.000Z",
            "updatedAt": "2023-07-07T02:05:27.000Z",
            "deletedAt": null,
            "gender": null,
            "job": null,
            "provider": null,
            "address": null,
            "__entity": "User"
        },
        // ...
    ],
    "hasNextPage": true
}
```
