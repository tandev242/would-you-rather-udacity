import React, { useState } from "react";
import {
    Box,
    Card,
    CardHeader,
    Button,
    CardContent,
    Typography,
    RadioGroup,
    FormControlLabel,
    FormControl,
    Radio,
    Divider
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { DEFAULT_IMAGE, User, Question } from '../constants';
import { handleSaveQuestionAnswer } from '../slices/questionSlice';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import PollQuestion from "./PollQuestion";
import PollResult from "./PollResult";

type LocationState = {
    author: User,
    question: Question
}

export default function PollPage({ user }: { user: User }) {
    const [isAnswered, setIsAnswered] = useState(false);
    const location = useLocation();
    const { question, author } = location.state as LocationState;

    return (
        <Box sx={{ width: 600, display: 'flex', justifyContent: 'center' }}>
            {
                isAnswered ?
                    (<PollResult 
                        user={user} 
                        author={author} 
                        question={question} />)
                    :
                    (<PollQuestion
                        user={user}
                        author={author}
                        question={question}
                        setIsAnswered={setIsAnswered}
                    />)
            }
        </Box>
    );
}
