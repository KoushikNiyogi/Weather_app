import React, { useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  IconButton,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { useSelector } from 'react-redux';


const Admin = () => {
  const {users} = useSelector((store)=>store.user)
  const [flag,setFlag] = useState(false);
  const deleteUser = (user) => {
    const updatedUsers = users.filter((el) => el.email !== user.email);
    localStorage.setItem("users",JSON.stringify(updatedUsers))
    setFlag(!flag);
  };
 console.log(flag)
  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Name</Th>
          <Th>Email</Th>
          <Th>Delete</Th>
        </Tr>
      </Thead>
      <Tbody>
        {users.length!=0&&users.map((user) => (
          <Tr key={user.id}>
            <Td>{user.name}</Td>
            <Td>{user.email}</Td>
            <Td>
              <IconButton
                icon={<DeleteIcon />}
                colorScheme="red"
                onClick={() => deleteUser(user)}
              />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default Admin;
