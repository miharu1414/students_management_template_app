import { FC, useEffect, useState } from "react";
import { Box, VStack, theme, Stack, Divider, Button } from "@chakra-ui/react"

import {  useParams, Link } from 'react-router-dom';

import PresentListItem from "./PresentListItem"
import { presentInfo } from "./PresentListContainer";
import SubmitModal from "src/components/features/SubmitStudents/SubmitModal";
import DateSelector from "src/components/common/DateSelector";
import Loading from "src/components/common/Loading";

type PresentListProps = {
    children? : Node,
    title: string,
    loading: boolean;
    selectedDate: Date;
    error:boolean;
    isDisable:boolean;

  
    studentsInfo: presentInfo[],
    onClickUpdate: ()=> void;
    handleDateChange: (value:Date) => void;
    onClickUpdateStudentType: (id: string, value: string) => void
    onClickReload:()=>void;
    onClickDelete:()=>void;
}

const PresentList: FC<PresentListProps> = (props) => {
    const {children, ...rest} = props;



    return (
        <VStack minWidth={"330px"}>  
        <Box display="flex" justifyContent="space-between" width="100%">
            <Box padding={3} border={2} borderColor={"whiteAlpha.200"}
                width={"120px"}
                borderRadius={10}
                backgroundColor={"blue.300"}
                textAlign={"center"}
                textColor={"white"}
                >
                <Link to={"/"}>登校管理
                </Link>
            </Box>
            <Box>
                <DateSelector 
                    selectedDate={rest.selectedDate}
                    handleDateChange={rest.handleDateChange}
                />
            </Box>
        </Box>
        <Box marginTop={3}
            fontSize={"2xl"}
        >
            {rest.title}
        </Box>
        <Divider/>
            {rest.error ? 
                <Button onClick={rest.onClickReload}>リロード</Button>
                :
                <Loading loading={rest.loading}>
                    <VStack spacing={0} overflowY={"scroll"}>
                        {typeof(rest.studentsInfo?.length) !== "undefined" && rest.studentsInfo?.map((studentInfo, index)=> {
                            return (
                                <PresentListItem 
                                index={index}
                                studentInfo={studentInfo}
                                onClickUpdateStudentInfo={rest.onClickUpdateStudentType}    
                                key={index}
                            />
                            )

                        })}


                    </VStack>
                </Loading>
            }
            

            

            
   

            <Box marginY={5}>
                <SubmitModal 
                    isDisable={rest.isDisable}
                    title="出席を更新"
                    onUpload={rest.onClickUpdate}
                />
            </Box>
            <Box marginBottom={5}>
                <SubmitModal 
                    title="出席を削除"
                    color="red"
                    onUpload={rest.onClickDelete}
                />
            </Box>
            <Box marginBottom={5}>
                <Button colorScheme="orange"><Link to={"/extraAttend"}>振替を登録
                </Link></Button>
            </Box>
        

        
        </VStack>
        
    )
}

export default PresentList;