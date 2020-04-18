import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import AppStyles from '../styles/AppStyles'


const Tab = (props) => {
  const { label, active, ...rest } = props;

  const content = <Text style={[styles.tabHeader, (!active && styles.activeTabHeader)]} >{label}</Text>

  if (active) {
    return (
      <View {...rest} style={[ props.style, styles.activeTab ]} >
        {content}
      </View>
    )
  } else {
    return (
      <TouchableOpacity {...rest} >
        {content}
      </TouchableOpacity>
    )
  }
}

const TabBar = (props) => {
  return (
    <View style={styles.tabBar} >
      {
        props.tabs.map((tab, index) => {
          return (
            <Tab
              key={tab.label}
              label={tab.label}
              style={styles.tab}
              active={(index === props.activeTab)}
              onPress={() => (props.onSelectTab) && props.onSelectTab(index)}
            />
          )
        })
      }
    </View>
  )
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    borderColor: AppStyles.color.tertiary,
    borderRadius: 2,
    borderBottomWidth: 1,
  },
  tabHeader: {
    fontSize: 18,
    color: 'black',
    textAlign: 'center',
  },
  tab: {
    padding: 7,
    flex: 1,
    textAlign: 'center',
  },
  activeTab: {
    backgroundColor: AppStyles.color.activeTab,
  },
  activeTabHeader: {
    color: AppStyles.color.primaryLight,
  }
})

export default TabBar
