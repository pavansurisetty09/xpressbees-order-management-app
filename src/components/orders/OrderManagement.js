import { Pagination, Table, Input, Space } from "antd";
import { useEffect, useState } from "react";
import { orders } from "../../data/orderData";
import { Typography } from "antd";
import "./OrderManagement.css";

const OrderManagement = () => {
  const [data, setData] = useState(orders);
  const [loading, setLoading] = useState(false);
  const [sorter, setSorter] = useState({});
  const { Search } = Input;
  const { Title } = Typography;

  const onSearch = (value) => {
    const searchString = value.toLowerCase();
    setData(
      orders.filter((order) =>
        ["orderId", "vendor", "pickupDate", "status"].some((prop) =>
          order[prop].toLowerCase().includes(searchString)
        )
      )
    );
  };

  const columns = [
    {
      title: "Order Id",
      dataIndex: "orderId",
      sorter: (a, b) => a.orderId - b.orderId,
      render: (orderId) => `${orderId}`,
    },
    {
      title: "Vendor Name",
      dataIndex: "vendor",
      sorter: (a, b) => a.vendor.localeCompare(b.vendor),
    },
    {
      title: "Pick Up Date",
      dataIndex: "pickupDate",
      sorter: (a, b) => a.pickupDate.localeCompare(b.pickupDate),
    },
    {
      title: "Status",
      dataIndex: "status",
      sorter: (a, b) => a.status.localeCompare(b.status),
    },
  ];

  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: data.length,
  });

  const handleTableChange = (sorter) => {
    setSorter(sorter);
  };

  const handlePaginationChange = (page) => {
    setPagination({ ...pagination, current: page });
  };

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      let sortedData = [...orders];
      const { field, order } = sorter || {};
      if (field && order) {
        sortedData = sortedData.sort((a, b) => {
          if (field === "orderId") {
            return order === "ascend"
              ? a[field] - b[field]
              : b[field] - a[field];
          } else {
            return order === "ascend"
              ? a[field].localeCompare(b[field])
              : b[field].localeCompare(a[field]);
          }
        });
      }
      setData(sortedData);
      setLoading(false);
    }, 500);
  }, [pagination, sorter]);

  return (
    <div className="order-management">
      <Space direction="vertical">
        <Title level={2}>Order Management</Title>
        <Search
          placeholder="Search Order..."
          onSearch={onSearch}
          style={{
            width: 200,
          }}
        />
      </Space>
      <Table
        columns={columns}
        rowKey={(record) => record.orderId}
        dataSource={data.slice(
          (pagination.current - 1) * pagination.pageSize,
          pagination.current * pagination.pageSize
        )}
        loading={loading}
        onChange={handleTableChange}
        pagination={false}
      />
      <Pagination
        current={pagination.current}
        pageSize={pagination.pageSize}
        total={pagination.total}
        onChange={handlePaginationChange}
      />
    </div>
  );
};

export default OrderManagement;
