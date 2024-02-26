<#ftl encoding="utf-8">
<html>
<head>
    <meta http-equiv="Content-type" content="text/html;charset=UTF-8">
    <title>Xác thực tài khoản</title>

    <!-- Bootstrap CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>

<body>
<div class="container mt-5">
    <h3>Xin chào <b>${email}</b>,</h3>

    <p class="mt-3">
        Cảm ơn bạn đã đăng ký tài khoản trên ChildrenCare. Để hoàn tất quá trình xác thực, vui lòng sử dụng mã dưới đây:
    </p>

    <div class="alert alert-success text-center">
        <p class="display-4 fw-bold">${maXacThuc}</p>
    </div>

    <p>Nhập mã này vào trang xác thực của chúng tôi để kích hoạt tài khoản.</p>

    <p>Trân trọng!</p>

    <p>Đội ngũ hỗ trợ</p>
</div>

</body>

</html>