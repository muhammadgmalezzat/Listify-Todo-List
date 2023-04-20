import React from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import styles from '../styles/modules/app.module.scss';


const details = (props) => {
    return (
        <div className={styles.content__wrapper} style={{marginBottom:"20px",minWidth:"300px"}}>
            <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                    <Grid item xs={4} justifyContent="center">
                        <div >
                            <h1 style={{ marginBottom: "10px", color: "#646ff0" }}>{props.allTasksNum }</h1>
                        </div>
                        <div>
                            <h4 style={{marginBottom:"5px",color:" #585858"}}>All</h4>
                        </div>
                    </Grid>
                    <Grid item xs={4} justifyContent="center">
                        <div >
                            <h1 style={{marginBottom:"10px",color:"#646ff0"}}>{props.completedNum }</h1>
                        </div>
                        <div>
                            <h4 style={{marginBottom:"5px",color:" #585858"}}>Completed</h4>
                        </div>
                    </Grid>
                    <Grid item xs={4} justifyContent="center">
                        <div >
                            <h1 style={{ marginBottom: "10px", color: "#646ff0" }}>{props.allTasksNum  - props.completedNum }</h1>
                        </div>
                        <div>
                            <h4 style={{marginBottom:"5px",color:" #585858"}}>Incompleted</h4>
                        </div>
                    </Grid>

                </Grid>
            </Box>
        </div>
    )
};

export default details