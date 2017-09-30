// This module contains information about the shelf categories:
//  - the default category 'none'
//  - the internal names of all the categories
//  - the display names of all the categories
//  - a function to get the display name for the supplied internal name
export const defaultCategory = 'none'
export const internalNames = ['currentlyReading', 'wantToRead', 'read', defaultCategory]
export const displayNames = ['Currently Reading', 'Want to Read', 'Read', 'None']
export function getDisplayName(internalName) {
    return displayNames[internalNames.indexOf(internalName)]
}