import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  ListGroup,
  CardSubtitle,
  ListGroupItem,
  Button,
} from "reactstrap";
import axios from 'axios';
import moment from 'moment';

const Feeds = () => {
  const [feedbackData, setFeedback] = useState([]);

  const getFeedbackList = () => {
    axios.get('http://localhost:9999/api/feedback/list')
        .then(res => {
          // console.log(res.data.data);
          setFeedback(res.data.data.map((record, index) => {
            return {
              index: index + 1,
              id: record.id,
              rating: record.rating,
              email: record.email,
              reviewText: record.reviewText,
              createdDate: record.createdDate,
              formattedDate: formatDate(record.createdDate),
              isActive: record.isActive,
            }
          }));
          function formatDate(datetimeString) {
            // Example using a library like Moment.js:
            return moment(datetimeString).format('YYYY-MM-DD HH:mm:ss');}
        })
        .catch(error => console.log(error));
  }
  useEffect(() => {
    getFeedbackList()
  }, []);
  return (
    <Card>
      <CardBody>
        <CardTitle tag="h5">Đánh giá</CardTitle>
        <CardSubtitle className="mb-2 text-muted" tag="h6">
          Mới nhất
        </CardSubtitle>
        <ListGroup flush className="mt-4">
          {feedbackData.slice(0, 2).map((feedback, index) => (
              <ListGroupItem
                  key={index}
                  className="d-flex flex-column p-3 border-0"
              >
                <div>
                  <b>Đánh giá:</b> {feedback.rating} sao
                </div>
                <div>
                  <b>Nội dung:</b> {feedback.reviewText}
                </div>
              </ListGroupItem>
          ))}
        </ListGroup>
      </CardBody>
    </Card>
  );
};

export default Feeds;
