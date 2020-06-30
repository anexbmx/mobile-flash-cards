import { StyleSheet } from 'react-native'
import { gray, lightGray, lightPurp } from '../utils/colors'
export default StyleSheet.create({
    flex: {
        flex: 1
    },
    flexRow: {
        flexDirection: 'row'
    },
    flexRowCenter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    justifySpaceBetween: {
        justifyContent: 'space-between'
    },
    alignItemsCenter: {
        alignItems: "center"
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 0,
        },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 2,
    },
    secondaryText: {
        color: gray,
        marginTop: 5
    },
    input: {
        borderWidth: 1,
        padding: 16,
        marginTop: 16,
        borderRadius: 8,
        borderColor: '#ddd'
    },
    bold: {
        fontWeight: 'bold'
    }
})