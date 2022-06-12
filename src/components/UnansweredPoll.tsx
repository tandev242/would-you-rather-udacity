import React, { useState } from "react";
import {
    Box,
    Card,
    CardHeader,
    Button,
    CardContent,
    Typography,
    Divider
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import { DEFAULT_IMAGE, User, Question } from '../constants';
import { useNavigate } from 'react-router-dom';

export default function UnansweredPoll({ question, author }: { question: Question, author: User }) {
    const navigate = useNavigate();

    const handleAnswerPoll = () => {
        navigate(`/questions/${question.id}`, {
            state: {
                question,
                author
            }
        })
    }

    return (
        <Card sx={{ width: '100%', mb: 2 }}>
            <CardHeader sx={{ backgroundColor: '#DCDCEA' }} title={`${author?.name || 'No name'} asks:`} />
            <Divider />
            <CardContent sx={{ display: 'flex' }}>
                <Avatar
                    sx={{ width: 150, height: 150, mr: 2 }}
                    src={author?.avatarURL || DEFAULT_IMAGE}
                />
                <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', justifyContent: 'space-between' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: '600' }}>
                        Would you rather:
                    </Typography>
                    <Typography
                        variant="subtitle1"
                        sx={{ alignSelf: 'center' }}
                    >
                        {question?.optionOne?.text} <br /> or...
                    </Typography>
                    <Button
                        fullWidth
                        color='success'
                        onClick={handleAnswerPoll}
                        variant="contained">
                        Answer Poll
                    </Button>
                </Box>
            </CardContent>
        </Card>
    );
}
