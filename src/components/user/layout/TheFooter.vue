<template>
    <footer>
      <div class="container1">
        <h3 class="title">Contact</h3>
        <div class="container-footer">
          <div class="left">
            <div class="left-info">
              <h1>
                <img src="https://static.vecteezy.com/system/resources/previews/002/953/630/original/travel-tour-logo-template-design-illustration-vector.jpg" alt="" class="rounded-circle"/>
                <div class="social-container">
                  <div class="item">
                    <font-awesome-icon icon="fa-brands fa-facebook" class="icon"/>
                    <font-awesome-icon icon="fa-brands fa-instagram" class="icon"/>
                    <font-awesome-icon icon="fa-brands fa-twitter" class="icon" />
                    <font-awesome-icon icon="fa-brands fa-pinterest" class="icon"/>
                  </div>
                </div>
              </h1>
              <p>vee-validate also handles form resets in a similar way to submissions. When resetting the form, all fields’ errors and meta flags will be reset to their original state, including the fields’ values.</p>
            </div>
          </div>
          <div class="right">
            <div class="contact-item">
              <div class="item">Address: 123 XYZ Street, A Ward, B District, C City</div>
              <div class="item">Phone: +84 987654321</div>
              <div class="item">Email: 20130307@st.hcmuaf.edu.vn</div>
            </div>
            <div class="payment">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTp1v7T287-ikP1m7dEUbs2n1SbbLEqkMd1ZA&s" alt="Payment"/>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </template>
  <style scoped>
  footer {
    background-color: #003c71;
    width: 100%;
    margin: 0;
    /* margin-top: 50px; */
  }
  .container1{
    width: 90%;
    margin: 0 5%;
    display: flex;
    flex-direction: column;
  }
  .title {
    text-transform: uppercase;
    display: flex;
    font-weight: 600;
    color: #ccc;
    padding-top: 20px;
  }
  footer .container-footer {
    display: flex;
    width: 100%;
    margin: 10px 0;
  }
  footer .container-footer .left {
    float: left;
    width: 50%;
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 10px;
  }
  footer .container-footer .left .left-info {
    display: flex;
    flex-direction: row;
  }
  h1 {
    float: left;
    width: 30%;
    display: flex;
    flex-direction: column;
  }
  .left-info h1 img {
    width: 100px;
    display: flex;
    margin-left: 30%;
  }
  .left h1 .social-container {
    display: flex;
    width: 100%;
    justify-content: center;
  }
  .social-container .item {
    width: 80%;
    height: 40px;
    border-radius: 50%;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .item .icon {
    width: 20px;
    height: 20px;
    margin: 0 5%;
  }
  .left-info p {
    float: right;
    width: 70%;
    color: #000;
    text-align: justify;
    align-items: center;
    line-height: 2;
  }
  .right {
    float: right;
    width: 50%;
    flex: 1;
    padding: 10px 0px 10px 20px;
    color: #ccc;
  }
  .contact-item {
    float: left;
    width: 70%;
    display: flex;
    flex-direction: column;
  }
  .contact-item .item {
    display: flex;
    line-height: 2;
  }
  .right .payment {
    float: right;
    width: 30%;
  }
  .payment img {
    width: 150px;
    border-radius: 5px;
  }
  </style>