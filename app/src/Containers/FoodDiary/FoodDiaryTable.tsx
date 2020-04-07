import React, { useState } from 'react';
import styled from 'styled-components';
import Media from "react-media";
import { CloseOutlined, PlusOutlined } from '@ant-design/icons';
import { Table, Button, Modal, Input, Empty } from 'antd';
import { blue } from '@ant-design/colors';
import breakfastSrc from '../../assets/breakfast.svg';

const TableWrapper = styled.div`
  margin: 16px 0;
`;

const StyledTable = styled(Table)`
  .ant-table-cell {
    &:not(:first-of-type) {
      text-align: center;
    }
  }
`;

const StyledButton = styled(Button)`
  margin: 12px auto;
`;

const DeleteLink = styled.div`
  color: ${blue[5]};
  cursor: pointer;
  text-align: center;
`;

const StyledModal = styled(Modal)`
  .ant-modal-header {
    display: flex;
    justify-content: center;
    padding: 12px;
  }
  .ant-modal-title {
    width: 100%;
  }
`;

const ModalTitle = styled.div`
  display: flex;
`;

const db = [
  {
    name: 'Food A',
    calories: 120,
    carbs: 0,
    fat: 14,
    protein: 0
  },
  {
    name: 'Food B',
    calories: 120,
    carbs: 0,
    fat: 14,
    protein: 0
  },
  {
    name: 'Food C',
    calories: 120,
    carbs: 0,
    fat: 14,
    protein: 0
  }
];

interface Props {
  meal: string
  data: {
    key: string
    name: string
    calories: number
    carbs: number
    fat: number
    protein: number
  }[]
  handleDelete: (meal: string, key: any) => void
}


const FoodDiaryTable: React.FC<Props> = ({ 
  meal, 
  data, 
  handleDelete 
}) => {
  const [modalVisibility, setModalVisibility] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [modalSearchResults, setModalSearchResults] = useState<any>(null);
  const { Search } = Input;
  const handleShowModal = () => {
    setModalVisibility(true);
  };
  const handleModalOk = () => {
    setModalLoading(true);
    setTimeout(() => {
      setModalVisibility(false);
      setModalLoading(false);
    }, 2000);
  };
  const handleModalCancel = () => {
    setModalVisibility(false);
  };
  const handleModalSearch = (value: string) => {
    const results = db.map(food => {
      if (food.name.toLowerCase().includes(value.toLowerCase())) {
        return food.name;
      } else {
        return null;
      }
    }).filter(food => food !== null);
    setModalSearchResults(results);
  };
  return (
    <TableWrapper>
      <Media query="(min-width: 768px)">
        {matches => {
          const columns = [
            {
              title: meal,
              dataIndex: 'name',
              ellipsis: true
            },
            {
              title: 'Calories',
              dataIndex: 'calories',
              width: 70
            }
          ];
          const collapsableColumns = [
            {
              title: 'Carbs',
              dataIndex: 'carbs',
              width: 70,
              className: 'ant-col-collapsable'
            },
            {
              title: 'Fat',
              dataIndex: 'fat',
              width: 70,
              className: 'ant-col-collapsable'
            },
            {
              title: 'Protein',
              dataIndex: 'protein',
              width: 70,
              className: 'ant-col-collapsable'
            }
          ];
          const deleteColDesktop = {
            title: '',
            width: 70,
            dataIndex: 'operation',
            render: (_: any, record: any) =>
              data.length >= 1 ? <CloseOutlined style={{ color: 'red', fontSize: '16px' }} onClick={() => handleDelete(meal, record.key)} /> : null
          };
          const deleteColMobile = {
            title: '',
            width: 70,
            dataIndex: 'operation',
            render: (_: any, record: any) =>
              data.length >= 1 ? <DeleteLink onClick={() => handleDelete(meal, record.key)}>Delete</DeleteLink> : null
          };
          if (matches) {
            collapsableColumns.forEach(col => columns.push(col));
            columns.push(deleteColMobile);
          } else {
            columns.push(deleteColDesktop);
          }
          return <StyledTable 
            columns={columns} 
            dataSource={data} 
            size="middle" 
            pagination={false}
            bordered={true}
          />
        }}
      </Media>
      <StyledButton 
        type="primary" 
        size="middle"
        onClick={handleShowModal}
      >
        Add Food
      </StyledButton>
      <StyledModal 
        title={
          <ModalTitle>
            <Search
              placeholder="Search for a food"
              onSearch={value => handleModalSearch(value)}
              size="large"
            />
            <Button 
              type="primary" 
              icon={<PlusOutlined />} 
              style={{marginLeft: '12px'}} 
              size="large" 
            />
          </ModalTitle>
        }
        closable={false}
        visible={modalVisibility}
        confirmLoading={modalLoading}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        centered
      >
        {modalSearchResults && modalSearchResults.length !== 0 ? 
          modalSearchResults.map((result: any, index: number) => <div key={`search-result${index}`}>{result}</div>) 
        :  
          <Empty
            image={breakfastSrc}
            imageStyle={{ height: 60 }}
            description={
              <>
                <div>
                  We can't find what you're looking for.
                </div>
                <div>
                  Tap the <PlusOutlined style={{fontSize: '10px'}} /> to create your own food.
                </div>
              </>
            }
          />
        }
      </StyledModal>
    </TableWrapper>
  )
};

export default FoodDiaryTable;