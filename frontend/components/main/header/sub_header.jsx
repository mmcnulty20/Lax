import React, { Component, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LocationDetailsButton from "./location_details";

const SubHeader = ({ fetchDetails, locationDetails, path }) => {
    useEffect( () => {
        if ( !locationDetails || !locationDetails.topic ) {
            fetchDetails(path.slice(3));
        }
    }, [ path, locationDetails ] );
    return (
        <div className="sub-header">
            <div className="location-info">
                { locationDetails ? (
                    <>
                    <h2>
                        <FontAwesomeIcon icon={locationDetails.isPrivate ? "lock" : "hashtag" } />
                        { locationDetails.name }
                    </h2>
                    { locationDetails.topic ? (
                        <ul>
                            <li>
                                <FontAwesomeIcon icon={["far", "user"]} />
                                { locationDetails.members.length }
                            </li>
                            <li>
                                
                            </li>
                            <li>
                                { locationDetails.topic }
                            </li>
                    </ul>
                    ) : null }
                    </>
                ) : (
                <h2>Location Info Here</h2> 
                )}
            </div>
            {/* <LocationDetailsButton /> */}
        </div>
    )
}

export default SubHeader;