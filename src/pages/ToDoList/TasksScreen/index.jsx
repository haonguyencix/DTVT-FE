import React, { useEffect, useState, useCallback, useReducer } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import TaskBoard from 'layouts/ToDoList/TaskBoard';
import Spinner from 'components/Spinner';
import TasksService from 'redux/tasks/tasksService';
import CardsService from 'redux/cards/cardsService';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    title: {
        flexGrow: 1,
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-start',
    },
    content: {
        flexGrow: 1,
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginRight: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: 0,
    },
    toolbar: {
        justifyContent: 'flex-end'
    }
}));

const taskReducer = (currentTasks, action) => {
    switch (action.type) {
        case 'GET_TASKS':
            return action.tasks;
        case 'ADD_TASK':
            return [...currentTasks, action.task];
        case 'DELETE_TASK':
            return currentTasks.filter(task => task.id !== action.id);
        case 'UPDATE_TASK':
            const index = currentTasks.findIndex(task => task.id === action.updateTask.id);
            currentTasks[index].title = action.updateTask.title;
            return [...currentTasks];
        case 'ADD_CARD':
            return;
        default:
            throw new Error('Should not get there!');
    }
};

const httpReducer = (curHttpState, action) => {
    switch (action.type) {
        case 'SEND':
            return { loading: true, error: null };
        case 'RESPONSE':
            return { loading: false, error: false };
        case 'ERROR':
            return { loading: false, error: action.errorMessage };
        case 'CLEAR':
            return { ...curHttpState, error: null };
        default:
            throw new Error('Should not get there!');
    }
};

const TasksScreen = (props) => {

    const classes = useStyles();
    const theme = useTheme();

    const [open, setOpen] = useState(false);
    const [tasks, dispatchTask] = useReducer(taskReducer, []);
    console.log("TCL: TasksScreen -> tasks", tasks)
    
    const [httpState, dispatchHttp] = useReducer(httpReducer, {
        loading: false,
        error: null
    });

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const onFetchTasks = useCallback(() => {
        dispatchHttp({ type: 'SEND' });
        TasksService.fetchTasks().then(res => {
            dispatchTask({ type: 'GET_TASKS', tasks: res.data });
            dispatchHttp({ type: 'RESPONSE' });
        }).catch(err => {
            console.log("TCL: onFetchTasks -> err", err)
            dispatchHttp({ type: 'ERROR', errorMessage: err });
        })
    }, []);

    const onAddTask = useCallback((task) => {
        TasksService.addTask(task).then(res => {
            dispatchTask({ type: 'ADD_TASK', task: res.data.new });
            dispatchHttp({ type: 'RESPONSE' });
        }).catch(err => {
            dispatchHttp({ type: 'ERROR', errorMessage: err });
        })
    }, []);

    const onDeleteTask = useCallback(id => {
        TasksService.deleteTask(id).then(res => {
            dispatchTask({ type: 'DELETE_TASK', id: res.data.deleteId });
            dispatchHttp({ type: 'RESPONSE' });
        }).catch(err => {
            dispatchHttp({ type: 'ERROR', errorMessage: err });
        })
    }, []);


    const onUpdateTask = useCallback((updateData) => {
        TasksService.updateTask(updateData).then(res => {
            dispatchTask({ type: 'UPDATE_TASK', updateTask: res.data.update });
            dispatchHttp({ type: 'RESPONSE' });
        }).catch(err => {
            dispatchHttp({ type: 'ERROR', errorMessage: err });
        })
    }, []);

    const onAddCard = useCallback(card => {

        CardsService.addCard(card).then(res => {
        }).catch(err => {
            dispatchHttp({ type: 'ERROR', errorMessage: err });
        })
    }, []);

    const onDeleteCard = useCallback(cardId => {
        CardsService.deleteCard(cardId).then(res => {

        }).catch(err => {
            dispatchHttp({ type: 'ERROR', errorMessage: err });
        })
    }, []);

    const onChangeCard = useCallback(cardId => {
        CardsService.updateCard(cardId).then(res => {

        }).catch(err => {
            dispatchHttp({ type: 'ERROR', errorMessage: err });
        })
    }, []);


    useEffect(() => {
        onFetchTasks();
    }, [onFetchTasks]);


    let taskBoard = <TaskBoard
        tasks={tasks}
        addTask={onAddTask}
        deleteTask={onDeleteTask}
        updateTask={onUpdateTask}
        addCard={onAddCard}
        deleteCard={onDeleteCard}
        changeCard={onChangeCard}
    />

    if (httpState.loading) {
        taskBoard = <Spinner />
    }

    return (
        <div className={classes.root}>
            <main className={clsx(classes.content, {
                [classes.contentShift]: open,
            })}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="end"
                        onClick={handleDrawerOpen}
                        className={clsx(open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                </Toolbar>
                {taskBoard}
            </main>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="right"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
                <Divider />
                <List>
                    {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {['All mail', 'Trash', 'Spam'].map((text, index) => (
                        <ListItem button key={text}>
                            <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </div>
    );
}

export default TasksScreen;

