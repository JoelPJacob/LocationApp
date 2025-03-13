import { Dimensions } from 'react-native';

let deviceWidth = Dimensions.get('window').width;
let deviceHeight = Dimensions.get('window').height;

class Constants {
  width = deviceWidth;
  height = deviceHeight;

  getHeight(percentage) {
    return deviceHeight * (percentage / 100);
  }

  getWidth(percentage) {
    return deviceWidth * (percentage / 100);
  }

  replaceIPAddress(url, newIPAddress) {
    return url.replace(/(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})/, newIPAddress);
  }

  // Colors
  defaultColors = ['#708CDC', '#F7D763', '#E2DEC2', '#D1D3FE', '#FCEFB4', '#B7F8D7'];
  appThemeBlue = ['#006994', '#66C4D4'];
  appThemeGreen = ['#099773', '#A1DAC8'];
  backgroundColor = "#D8F1F5";
  backgroundColor1 = "#DFF2E0";
  buttonColor = '#006994';
  buttonColor1 = "#317B36";
  buttonColorGreen = '#099773';
  backgroundColorGreen = "#C6E9DE";
  black = '#000000';
  white = '#FFFFFF';
  backgroundColor3 = 'white';
  transparentColor = 'transparent';

  // Notifications
  notificationSound = 'default';
  notificationColor = '#FFBB1A';
  notificationSmallIcon = 'ic_stat_ic_notification';
  notificationLargeIcon = 'ic_launcher';

  regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
  ip = "13.53.134.213";

  // Base URLs
  baseUrl = "http://13.53.134.213:7075/";
}

export default new Constants();
