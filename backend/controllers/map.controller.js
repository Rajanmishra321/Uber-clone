const mapController = require('../controllers/map.controller');

const { validationResult } = require( 'express-validator' );
const { getCoordinates, getDistanceTime, getAutoCompleteSuggestions } = require('../services/maps.service');

module.exports.getCoordinates = async ( req, res ) => {

    const errors = validationResult( req );
    if ( !errors.isEmpty() ) { 
        return res.status( 400 ).json( { errors: errors.array() } );
    }

    const { address } = req.query;
    
   try {
    const coordinates = await getCoordinates( address );
    if ( coordinates ) {
         res.status( 200 ).json( coordinates );
    }
   } catch (error) {
         console.error( error );
         res.status( 404 ).json( { message: 'coordinates not found' } );
   }
}

module.exports.getDistanceTime = async ( req, res ) => {
    const errors = validationResult( req );
    if ( !errors.isEmpty() ) { 
        return res.status( 400 ).json( { errors: errors.array() } );
    }

    const { origin, destination } = req.query;
    console.log( origin, destination );
    try {
        const { distance, time } = await getDistanceTime( origin, destination );
        if ( distance && time ) {
            res.status( 200 ).json( { distance, time } );
        }
    } catch (error) {
        console.error( error );
        console.log(error);
        res.status( 500 ).json( { message: 'Internal Server Error' } );
    }
}

module.exports.getAutoCompleteSuggestions = async ( req, res ) => {
    try{
        const error = validationResult( req );
        if( !error.isEmpty() ){
            return res.status( 400 ).json( { errors: errors.array() } );
        }

        const { input } = req.query;
        const suggestions = await getAutoCompleteSuggestions( input );
        if( suggestions ){
            res.status( 200 ).json( suggestions );
        }

    }catch(error){
        console.error( error );
        res.status( 500 ).json( { message: 'Internal Server Error' } );
    }
}