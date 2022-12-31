import { Avatar, Card } from "antd";
import moment from "moment";
import { useSelector } from "react-redux";
const { Meta } = Card;
const ConnectNav = () => {
  const { username, createdAt } = useSelector((state) => state.user.value);
  return (
    <div className="d-flex justify-content-around">
      <Card>
        <Meta
          avatar={<Avatar>{username[0]}</Avatar>}
          title={username}
          description={`Joined at ${moment(createdAt).fromNow()}`}
        />
      </Card>
      {/* username && stripe_seller &&stripe_seller.charges_enabled <div>Payment Balance</div>
      <div>Payment Settings</div>*/}
    </div>
  );
};

export default ConnectNav;
