
import React from 'react';

import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';

//import Grid from 'material-ui/Grid';


// Ei tarvitse export luokalle , jos se on samassa tiedostossa


// *******************************************************

class ApuLuokka {

    constructor(props) {
       //super(props);
        this.state = {
            tx_arvo: ""
        }
    }
}



// ******************************************************

class Luokka3 extends React.Component {


    // -------------------------------------------------------------------------------
    constructor(props) {
        super(props);
        this.state = {
            kentta_arvo: "",
            //apuObjekti: ApuLuokka
            apuObjekti: new ApuLuokka()

        }
    }

    // -------------------------------------------------------------------------------
   
    nappiPainettu(){

        console.log("Nappi painettu, kenttän arvo on : " + this.state.apuObjekti.state.tx_arvo);

        let palvelin_url = "http://localhost:8089/hello";

        //fetch komento NodeJS hapi-moduulia varten
               fetch(palvelin_url).then((resp) => {
             //console.log( "Fetch on aloitettu !" ); // tämä viesti ei näy ---> ei näy catch lohkossa, näkyy vain ennen return komentoa, mutta aiheuttaa virhettä tässä kohdassa (häiritse JSON palautusta)
            return resp.json();
        }).then((r) => {
            console.log("Fetch on suoritettu !"); //tulostetaan aina kun sivu on löytynyt
            console.log("R", r.body, r.test);

            console.log("Palvelin data (NodeJS + hapi-moduuli )  :" +r);

            this.setState({ test: r.body });
        }).catch((err) => {
            console.log("Sivua ei löytynyt suorita virhe poikkeus tänne !");
         //   this.setState({ error: true, errorMsg: "poop" });
            console.log("ERR", err);
})


    }

    //--------------------------------------------------------------------------------
    render() {

        let x = 'x';

        //let ui_kentta = ( <div> <Grid className={classes.root}> <Grid item xs={12}>  Tieto </Grid> </Grid> </div>);

        let ui_kentta = (<div>
            <TextField
                style={{ color: 'red' }}
                 onChange={ 
                //onClick={

                    (tapahtuma) => {
                        //this.x = 'xx'
                        //  if (tapahtuma.keyCode === 13) {
                        //lue kenttän arvo, kun Enter näppäin on painettu
                       // this.state.kentta_arvo = tapahtuma.target.value;
                     
                       // console.log("Kenttän arvo on : " + this.state.kentta_arvo);
                        //  } //jos kentässä on painettu enter näppäin 

                          this.state.apuObjekti.state.tx_arvo = tapahtuma.target.value;
                          // console.log("Kenttän arvo on : " + this.state.apuObjekti.state.tx_arvo);    

                    } //tapahtuma

                } //onChange

               // floatingLabelText="Fixed Floating Label Text"
               // floatingLabelFixed={true} 
               ></TextField>
                </div>);



        let ui_nappi = (
            <div>
                <Button onClick = { () => this.nappiPainettu()  } style={{ backgroundColor: 'orange', fontSize: 24, color: 'green' }} > Paina Nappia </Button>
            </div>
        );


        return <p> Luokka 3 {ui_kentta} {ui_nappi} </p>;
    }

    // -------------------------------------------------------------------------------    

}

export default Luokka3;