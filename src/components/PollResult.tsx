import {
    Box,
    Card,
    CardHeader,
    Button,
    CardContent,
    Typography,
    Divider
} from '@mui/material';
import LinearProgress, { LinearProgressProps } from '@mui/material/LinearProgress';
import Avatar from '@mui/material/Avatar';
import { DEFAULT_IMAGE, User, Question } from '../constants';

export default function PollResult({ user, author, question }: { user: User, author: User, question: Question }) {

    const vote = {
        optionOne: question.optionOne.votes.length,
        optionTwo: question.optionTwo.votes.length,
        total: question.optionOne.votes.length + question.optionTwo.votes.length,
    }

    const votePercent = {
        optionOne: vote.optionOne / vote.total * 100,
        optionTwo: vote.optionTwo / vote.total * 100
    }

    const myOption: any = user.answers[question.id as keyof Object];
    const optionOneStyle = {
        border: 3,
        borderRadius: '10px',
        borderColor: myOption === 'optionOne' ? 'secondary.main' : 'grey.500'
    };
    const optionTwoStyle = {
        border: 3,
        borderRadius: '10px',
        borderColor: myOption === 'optionTwo' ? 'secondary.main' : 'grey.500'
    };

    return (
        <Box sx={{ width: 600, display: 'flex', justifyContent: 'center' }}>
            <Card sx={{ width: '100%', m: 2 }}>
                <CardHeader sx={{ backgroundColor: '#DCDCEA' }} title={`${author?.name || 'No name'} asks:`} />
                <Divider />
                <CardContent sx={{ display: 'flex' }}>
                    <Avatar
                        sx={{ width: 150, height: 150, mr: 2 }}
                        src={author?.avatarURL || DEFAULT_IMAGE}
                    />
                    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%', ml: 1 }}>
                        <Typography variant="h5" sx={{ fontWeight: '600' }}>
                            Results:
                        </Typography>
                        <Typography variant="body1">
                            Would you rather
                        </Typography>
                        <Box sx={{ mt: 2, mb: 2, p: 2, ...optionOneStyle }}>
                            <Typography variant="body1" sx={{ fontWeight: '600' }}>
                                {question.optionOne.text}
                            </Typography>
                            <LinearProgressWithLabel sx={{ height: 30 }} color="inherit" value={votePercent.optionOne} />
                            <Typography variant="body1" sx={{ fontWeight: '600' }}>
                                {`${vote.optionOne} out of ${vote.total} votes`}
                            </Typography>
                        </Box>
                        <Box sx={{ mb: 2, p: 2, ...optionTwoStyle }}>
                            <Typography variant="body1" sx={{ fontWeight: '600' }}>
                                {question.optionOne.text}
                            </Typography>
                            <LinearProgressWithLabel sx={{ height: 30 }} color="secondary" value={votePercent.optionTwo} />
                            <Typography variant="body1" sx={{ fontWeight: '600' }}>
                                {`${vote.optionTwo} out of  ${vote.total} votes`}
                            </Typography>
                        </Box>
                        <Button variant="contained"> Back </Button>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
}

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1 }}>
                <LinearProgress variant="determinate" {...props} />
            </Box>
            <Box sx={{ minWidth: 35 }}>
                <Typography variant="h5" color="text.secondary">{`${Math.round(
                    props.value,
                )}%`}</Typography>
            </Box>
        </Box>
    );
}