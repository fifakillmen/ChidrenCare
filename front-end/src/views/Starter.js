import { Col, Row } from "reactstrap";
import SalesChart from "../components/dashboard/SalesChart";
import Feeds from "../components/dashboard/Feeds";
import ProjectTables from "../components/dashboard/ProjectTable";
import '../assets/scss/app.scss';
import Blog from "../components/dashboard/Blog";
import bg1 from "../assets/images/tim-mach-1.jpg";
import bg2 from "../assets/images/2-2.jpg";
import bg3 from "../assets/images/1.png";
import bg4 from "../assets/images/tiem-chung-gt.jpg";

const BlogData = [
  {
    image: bg1,
    title: "PHẪU THUẬT TIM MẠCH – CAN THIỆP TIM MẠCH",
    subtitle: "2 comments, 1 Like",
    description:
      "Trung tâm Tim mạch Trẻ em – Bệnh viện Nhi Trung ương là một trong những Trung tâm lớn nhất về Tim mạch nhi trong cả nước.",
    btnbg: "primary",
  },
  {
    image: bg2,
    title: "SÀNG LỌC SƠ SINH",
    subtitle: "2 comments, 1 Like",
    description:
      "Sàng lọc sơ sinh có lịch sử từ rất lâu đời. Từ những năm 1930, xét nghiệm tã để phát hiện bệnh lý Phenyl keton niệu là kỹ thuật sàng lọc sơ khai được triển khai.",
    btnbg: "primary",
  },
  {
    image: bg3,
    title: "TIÊM CHỦNG VACCINE",
    subtitle: "2 comments, 1 Like",
    description:
      "Đội ngũ bác sĩ, điều dưỡng được đào tạo bài bản, chuyên sâu về lĩnh vực vắc xin, tiêm chủng và cấp cứu Nhi khoa, thấu hiểu tâm lý trẻ em..",
    btnbg: "primary",
  },
  {
    image: bg4,
    title: "GHÉP TẾ BÀO GỐC ĐIỀU TRỊ CÁC BỆNH LÝ Ở TRẺ",
    subtitle: "2 comments, 1 Like",
    description:
      "Cùng với sự phát triển của khoa học công nghệ nói chung, các kỹ thuật và công nghệ mới cũng được phát triển, ứng dụng...",
    btnbg: "primary",
  },
];

const Starter = () => {
  return (
    <div>
      {/***Top Cards***/}

      {/***Sales & Feed***/}
      <Row>
        <Col sm="6" lg="6" xl="7" xxl="8">
          <SalesChart />
        </Col>
        <Col sm="6" lg="6" xl="5" xxl="4">
          <Feeds />
        </Col>
      </Row>
      {/*/!***Table ***!/*/}
      {/*<Row>*/}
      {/*  <Col lg="12">*/}
      {/*    <ProjectTables />*/}
      {/*  </Col>*/}
      {/*</Row>*/}
      {/***Blog Cards***/}
      <Row>
        {BlogData.map((blg, index) => (
          <Col sm="6" lg="6" xl="3" key={index}>
            <Blog
              image={blg.image}
              title={blg.title}
              subtitle={blg.subtitle}
              text={blg.description}
              color={blg.btnbg}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Starter;
