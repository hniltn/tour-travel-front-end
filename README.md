# tours-website-demo

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

"id": "0705",
      "advisingRequestId": "4954",
      "date": "28/10/2024",
      "content": "Đã liệt kê cho khách hàng các dịch vụ kèm theo của tour",
      "responserId": "2d34"

tôi muốn khi nhập các thông tin như Ngày liên hệ, Nội dung tư vấn và nhấn nút Hoàn thành thì các giá trị date, content, responser sẽ được lưu vào trong bangr advisingResponse (lưu ý, advisingResponse có các field: idResponse, advisingRequestId: id của request đang tư vấn, date: Ngày liên hệ, content: nội dung tư vấn, responserId: id của user đang đăng nhập), Nếu tôi vừa nhấn Đã hoàn thành tư vấn và button hoàn thành thì sẽ trả về idReplied của table advisingRequest là 1, nếu tôi chỉ nhấn button Hoàn thành thì isReplied của table advisingRequest là 0.