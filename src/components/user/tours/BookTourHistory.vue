<template>
    <div class="container2">
      <div class="row-tours">
        <div class="tours">
          <router-link to="" class="link">
            <span class="tour-name">Ten tour</span>
            <div class="tour">
              <div class="tour-img">
                <img src="https://bcp.cdnchinhphu.vn/344443456812359680/2023/9/18/hl-4938-1695021625841340768767.jpg" alt=""/>
              </div>
              <div class="tour-info">
                <ul class="info">
                  <li>
                    <span class="content">
                      <font-awesome-icon icon="fa-solid fa-barcode" class="icon"/>Mã tour:
                    </span>
                  </li>
                  <li>
                    <span class="content">
                      <font-awesome-icon icon="fa-solid fa-clock" class="icon" />Thời gian:
                    </span>
                  </li>
                  <li>
                    <span class="content">
                      <font-awesome-icon icon="fa-solid fa-calendar" class="icon"/>Ngày khởi
                      hành:
                    </span>
                  </li>
                  <li>
                    <span class="content">
                      <font-awesome-icon
                        icon="fa-solid fa-plane-departure" class="icon"
                      />Phương tiện:
                    </span>
                  </li>
                  <li>
                    <span class="content">
                      <font-awesome-icon icon="fa-solid fa-star" class="icon"/>Chất lượng
                    </span>
                  </li>
                  <li>
                    <span class="content">
                      <font-awesome-icon icon="fa-solid fa-user" class="icon"/>Số người lớn:
                    </span>
                  </li>
                  <li>
                    <span class="content">
                      <font-awesome-icon icon="fa-solid fa-child" class="icon"/>Số trẻ em:
                    </span>
                  </li>
                  <li>
                    <span class="content">
                      <font-awesome-icon icon="fa-solid fa-credit-card" class="icon"/>Hình thức:
                    </span>
                  </li>
                  <li>
                    <span class="content">
                      <font-awesome-icon icon="fa-solid fa-calendar-check" class="icon"/>Ngày
                      thanh toán:
                    </span>
                  </li>
                  <li>
                    <span class="content">
                      <font-awesome-icon
                        icon="fa-solid fa-money-check-dollar" class="icon"/>Tổng tiền:
                    </span>
                  </li>
                </ul>
              </div>
              <div class="paying-status">
                  <p>Đã thanh toán</p>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </template>
  <style scoped>
  .container2 {
      width: 100%;
      margin: 10px 0;
  }
  .row-tours {
      display: flex;
      flex-direction: column;
      text-align: justify;
  }
  .tours {
      width: 100%;
      border: 1px solid #b8b5b5;
      border-radius: 4px;
      padding: 5px;
      display: flex;
      flex-direction: column;
  }
  .tours:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  }
  .link {
      text-decoration: none;
      color: #000;
  }
  .tour-name {
      font-size: 24px;
      font-weight: 600;
      color: #003c71;
  }
  .tour {
      display: flex;
      flex-direction: row;
      margin-top: 10px;
  }
  .tour-img {
      width: 20%;
  }
  .tour-img img {
      width: 350px;
      border-radius: 4px;
      height: 250px;
  }
  .tour-info {
      width: 60%;
  }
  .tour-info .info {
      list-style-type: none;
      line-height: 1.6;
  }
  .tour-info .info .icon {
      width: 30px;
  }
  .paying-status {
      width: 20%;
      display: flex;
      align-items: center;
  }
  .paying-status p {
      color: orange;
      font-weight: 600;
      font-style: italic;
      font-size: 18px;
  }
  </style>