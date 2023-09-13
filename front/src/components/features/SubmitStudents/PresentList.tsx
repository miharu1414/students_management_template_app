import { FC, useState } from "react";
import { Box, VStack, theme, Stack, Divider, Button } from "@chakra-ui/react"

import {  useParams, Link } from 'react-router-dom';

import PresentListItem from "./PresentListItem"
import { presentInfo } from "./PresentListContainer";
import SubmitModal from "src/components/common/SubmitModal";
import DateSelector from "src/components/common/DataSelector";
import Loading from "src/components/common/Loading";

type PresentListProps = {
    children? : Node,
    title: string,
    loading: boolean;
    selectedDate: Date;


  
    studentsInfo: presentInfo[],
    handleDateChange: (value:Date) => void;
    onClickUpdateStudentInfo: (id: string, value: string) => void

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
            <Loading loading={rest.loading}>
                <VStack spacing={0} overflowY={"scroll"}>
                    {rest.studentsInfo.map((studentInfo, index)=> {
                        return (
                            <PresentListItem 
                            index={index}
                            studentInfo={studentInfo}
                            onClickUpdateStudentInfo={rest.onClickUpdateStudentInfo}    
                            key={index}
                        />
                        )

                    })}


                </VStack>

            </Loading>

            
   

            <Box marginBottom={5}>
                <SubmitModal title="出席を更新"/>
            </Box>
 
        

        
        </VStack>
        
    )
}

export default PresentList;