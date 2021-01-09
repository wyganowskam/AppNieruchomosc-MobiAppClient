import React, { useState, useEffect } from 'react'
import announcementService from '../../services/announcement.service'
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';
import Pagination from '@material-ui/lab/Pagination';
import { FAB } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import Typography from '@material-ui/core/Typography';


const styles = StyleSheet.create = ({
    root:{
        
    },
    paper:{
        padding:'10px 15px 5px 15px', 
        margin:'20px 10px 20px 10px', 
        textAlign: 'left',
        boxShadow: "2px 3px 11px -5px #7cbfa8",
    },
    divider: {
      marginTop:10,
      marginBottom:10,
      backgroundColor: "#9cf0d3"
    },
    fab: {
      position: 'absolute',
      margin: 15,
      right: 0,
      top: 0,
      backgroundColor: '#666666'
    },
  });

export default function Announcements(props){

    const [page, setPage] = useState(1);
    const [announcements, setAnouncements] = useState([]);
    const [isNewPage, setIsNewPage] = useState(true);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        announcementService.getAnnouncementsPagesCount().then(
            res => {
                setTotalPages(res.data);       
            },
            (error) => {
              
            }
          ).catch(e => { });
    }, []);

    useEffect(() => {
        announcementService.getAnnouncements(page).then(
            res => {
                    setIsNewPage(false);
                    setAnouncements(res.data);
                    setIsNewPage(true);       
            },
            (error) => {
              
            }
          ).catch(e => { });
    }, [page]);


    const onPageChange = (e, pageNr) => {
        console.log(pageNr);
        setPage(pageNr);
    }

    return (
      <div style={styles.root}>
          <div style={{height: 30}}>
          <FAB
                small
                icon="plus"
                onPress={() =>{props.navigation.push('AnnouncementAdd')}}  
              style={styles.fab}
                />
          <Pagination siblingCount={0} count={totalPages} style={{float: 'left',marginTop:20, marginBottom:20}}
          page={page} onChange={onPageChange}/>


          </div>
          <Divider style={{clear:'left', paddingTop:2}} />
         {announcements.map((ann, index) => (
             <Grow in={isNewPage}
             style={{ transformOrigin: '0 0 0 0' }}
             {...(isNewPage ? { timeout: 300 * (index + 1) } : {})}>
                             <Paper square="true" key={ann.id} elevation={3} style={styles.paper} 
                             onClick={(e) =>{props.navigation.push('AnnouncementDetails',{announcementId:ann.id})}}  
                             >
                            
             <Grid container spacing={2}>
                <Grid item xs={12}> 
                <Grid container spacing={2}>
                <Grid item xs={6} style={{wordWrap: 'break-word'}}>
                <Typography variant="subtitle1">
                <svg style = {{float:'left', marginRight:10}} xmlns="http://www.w3.org/2000/svg" height="25" viewBox="0 0 24 24" width="25"><path d="M0 0h24v24H0z" fill="none"/><path d="M18 11v2h4v-2h-4zm-2 6.61c.96.71 2.21 1.65 3.2 2.39.4-.53.8-1.07 1.2-1.6-.99-.74-2.24-1.68-3.2-2.4-.4.54-.8 1.08-1.2 1.61zM20.4 5.6c-.4-.53-.8-1.07-1.2-1.6-.99.74-2.24 1.68-3.2 2.4.4.53.8 1.07 1.2 1.6.96-.72 2.21-1.65 3.2-2.4zM4 9c-1.1 0-2 .9-2 2v2c0 1.1.9 2 2 2h1v4h2v-4h1l5 3V6L8 9H4zm11.5 3c0-1.33-.58-2.53-1.5-3.35v6.69c.92-.81 1.5-2.01 1.5-3.34z"/></svg>
                  <strong>{ann.title}</strong>
                  </Typography>
                </Grid>
                <Grid item xs={6} style={{textAlign: 'right'}}>

                    </Grid> 
                </Grid>
                
                <Typography style={{marginTop:10}} variant="body2">{ann.shortText}</Typography>
                
                <Divider style={styles.divider}/>
                <Grid container wrap="nowrap" spacing={2}>
                <Grid item xs={6}> <Typography variant="caption">&nbsp;{ann.created}</Typography></Grid>
                <Grid item xs={6} style={{textAlign: 'right'}}>
                <Typography variant="caption">
                  Komentarzy:&nbsp;{ann.numberOfComments}
                  </Typography>
                  </Grid>
                </Grid>
           
                </Grid>

                <Grid item xs={0}>
                
                </Grid>

             </Grid>
             </Paper>

             </Grow>

          ))}
      </div>
    )
}
