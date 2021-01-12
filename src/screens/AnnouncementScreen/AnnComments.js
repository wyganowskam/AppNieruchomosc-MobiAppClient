import React, { useState, useEffect } from 'react'
import announcementService from '../../services/announcementService';
import {View, FlatList, ScrollView,StyleSheet ,Image} from 'react-native'
import {Divider,Button, Text, Switch, Card,Chip, TextInput,Checkbox} from 'react-native-paper';
import colors from "../../config/colors";


const Comments = (props) => {

   
    const announcementId = props.announcementId;
    const [allowComments, setAllowComments] = useState(true);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [comments, setComments] = useState([]);
    const [isFormValid, setIsFormValid] = useState(true);
    const [message, setMessage] = useState("");
    const [text, setText] = useState("");
    const [loading, setLoading] = useState(false);
    const [goToLastPage, setGoToLastPage] = useState(false);
    const [forceReload, setForceReload] = useState(false);


    useEffect(() => {
      announcementService.getCommentPagesCount(announcementId).then(
          res => {
              setTotalPages(res.data);
              if(goToLastPage){
                if(page === res.data){
                  setForceReload(old => !old);
                }
                setPage(res.data);
                setGoToLastPage(false);
              }
          },
          (error) => {
            
          }
        ).catch(e => { });
  }, [page, announcementId, goToLastPage]);


    useEffect(() => {
        announcementService.getComments(announcementId, page).then(
            res => {     
              setComments(res.data);     
            },
            (error) => {
              
            }
          ).catch(e => { });
    }, [announcementId, page, forceReload]);

  

    const validate = () => {
      if(!text){
          setMessage("Komentarz jest pusty");
          setIsFormValid(false);
          return false;
      }
      else if(text.length < 3){
          setMessage("Komentarz musi mieć co najmniej 3 znaki");
          setIsFormValid(false);
          return false;
      }
      else{
          setIsFormValid(true);
          return true;
      }
  
    }
  
    const handleAdd = (e) => {
      e.preventDefault();
      setMessage("");
      let isValid = validate();
  
      if(isValid === true){
        setLoading(true);
        announcementService.createComment({
            announcementId: announcementId,
            text: text,
        }).then(
          () => {
            setGoToLastPage(true);
          },
          (error) => {
            const resMessage =
              (error.response &&
                error.response.data &&
                error.response.data.message) ||
              error.message ||
              error.toString();
  
            setLoading(false);
            setIsFormValid(false);
            setMessage(resMessage);
  
          }
        );
      }
      setText("");
      setLoading(false);
    };
    


  const switchChange = () => {
   setAllowComments(!allowComments);
   setMessage("");
    
};

const previousPage = () => {
    if (page>1) setPage(page-1);
    setMessage(""); 
}

const nextPage = () => {
    if (page<totalPages) setPage(page+1); 
    setMessage("");
}



    return (
     
    <ScrollView>

    <Text style={{fontSize:16,alignSelf:"center",color:colors.black}} >Komentarze</Text>
   
    <View style={{height:50,flexDirection:"row",padding:10,alignItems:"center",alignSelf:"center"}}>
        <Button
            mode="text"
            compact={true}
            uppercase={false}
            onPress={previousPage}
            style={{alignSelf:"center"}}
          > <Image style={{width:20,height:20,alignSelf:"center"}} source={require('../../assets/icons/left-arrow-bold.png')} />
              
            </Button>
        <Text style={{fontSize:20,alignSelf:"center",marginLeft:6,paddingBottom:2}}>
        {page} </Text>
          <Button
            mode="text"
            compact={true}
            uppercase={false}
            onPress={nextPage}
            style={{alignSelf:"center"}}
          > <Image style={{width:20,height:20,alignSelf:"center"}} source={require('../../assets/icons/right-arrow-bold.png')} />
              
            </Button>
        </View>
        <View style={{flexDirection:"row"}}>
        <Checkbox
        status={allowComments ? 'checked' : 'unchecked'}
        onPress={switchChange}
        theme={{colors:{
            primary:colors.white,
            accent: colors.white
        }}}
        />
        <Text style={{marginTop: 5,fontSize:16}}>Pozwalaj na komentowanie</Text>
    </View>


      {comments.map((comment, index) => (
        <Card  key={comment.id} style={{margin:10, borderRadius:20, backgroundColor:colors.white,padding:0}} 
        >
              
              <Card.Content>
                <View style={{flexDirection:"row",flex:1,alignItems:"center",alignContent:"flex-start",marginBottom:4}}>
                  <Text style={{fontSize:16}}>{comment.authorName+ " "+  comment.authorSurname+"  "} </Text>
                  {comment.isAuthorBoardMember && <Chip mode="outlined">Zarząd</Chip> }
                  {comment.isAuthorAdministrator && <Chip mode="outlined">Administrator</Chip> }
                  <Text style={{color:colors.grey,alignSelf:"flex-start",flex:1,textAlign:"right",fontSize:11}} >{comment.created}</Text>
                </View>
                <Divider/>
                <Text style={{marginTop:20}} >{comment.text}</Text> 
               
              </Card.Content> 
            </Card>
      ))}
    {!isFormValid && <Text style={{margin:10,alignSelf:"center",color:"red"}}>{message}</Text>}
    {allowComments ? 

    <View style={{flexDirection:"row",flex:1}}>
            <TextInput
                label="Komentarz"
                value={text}
                mode="outlined"
                style={{margin:10,backgroundColor:colors.white,flex:1}}
                onChangeText={t => {setText(t);  setMessage("");}}
                multiline
            />
          
            <Button
            mode="text"
            compact={true}
            uppercase={false}
            onPress={handleAdd}
            style={{alignSelf:"center"}}
          > <Image style={{width:20,height:20,alignSelf:"center"}} source={require('../../assets/icons/send.png')} />
              
            </Button>
            </View>
            : <Text style={{alignSelf:"center"}}>Możliwość komentowania posta jest wyłączona.</Text>}
        </ScrollView>
        )
}

export default Comments;