import React, { memo, useState, useCallback } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { SafeAreaProvider, useSafeArea } from 'react-native-safe-area-context'
import _ from 'lodash'
import GridView from 'react-native-draggable-gridview'

/**
 * App
 */
export default function App(props) {
    let {
        height,
        spaceWidth,
        data,
    } = props;
  return (
    <SafeAreaProvider>
      <Container 
        dataApi={data}
        height={height}
        spaceWidth={spaceWidth}
      />
    </SafeAreaProvider>
  )
}

/**
 * Container
 */
const Container = memo(({height, spaceWidth, dataApi}) => {
  const { top, bottom } = useSafeArea()
  const [editing, setEditing] = useState(false)
  const [data, setData] = useState(dataApi)

  const onPressEdit = useCallback(() => {
    setEditing(!editing)
  }, [editing])

  const locked = useCallback((item) => false, [])

  const renderLockedItem = useCallback(
    () => <LockedItem editing={editing} onPress={onPressAdd} />,
    [editing, data]
  )

  const renderItem = useCallback(
    (item) => (
      <Item height={height} item={item} editing={editing} onPressDelete={onPressDelete} />
    ),
    [editing, data]
  )

  const onBeginDragging = useCallback(() => !editing && setEditing(true), [
    editing,
  ])

  const onPressCell = useCallback((item) => !editing && alert(item.color), [
    editing,
  ])

  const onPressAdd = useCallback(
    () => !editing && setData([...data]),
    [editing, data]
  )

  const onReleaseCell = useCallback(
    (items) => {
      const data1 = items
      if (!_.isEqual(data, data1)) setData(data1)
      setEditing(false)
    },
    [data]
  )

  const onPressDelete = useCallback(
    (item) => setData(data.filter((v) => v.id != item.id)),
    [data]
  )

  return (
    <View style={{ flex: 1 }}>
      <GridView
        data={[...data]}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        renderLockedItem={renderLockedItem}
        locked={locked}
        onBeginDragging={onBeginDragging}
        onPressCell={onPressCell}
        onReleaseCell={onReleaseCell}
        numColumns={10}
        width={spaceWidth}
        delayLongPress={editing ? 50 : 500}
        containerMargin={{ top: 0, bottom: 0, left: 0, right: 0 }}
      />
    </View>
  )
})
let i = 0
const Item = memo(({ item, editing, onPressDelete, height }) => {
    i ++;
    console.log(item)
    console.log(Object.keys(item).length)
    if (Object.keys(item).length > 0) {
        return (
            <View style={[
                { 
                    backgroundColor: item.color1,
                    width: item.width1, 
                    height: height,
                    // borderLeftColor: 'yellow',
                    // borderStyle: 'solid',
                    // borderLeftWidth: 2,
                    marginTop: 3,
                    borderRadius: 1000,
                    zIndex: 1000,
                }]}
                onPress={() => {
                    console.log("---")
                }}
                >
                <View style={{
                    width: item.width2, 
                    height: height, 
                    backgroundColor: item.color2,
                    borderRadius: 1000,
                    marginLeft: item.marginLeft2,
                }}>
                    {/* <Text style={{color: 'white'}}>{i}</Text> */}
                </View>
            </View>
        )
    } else {
        return (
            null
        )
    }
})

const LockedItem = memo(({ editing, onPress }) => (
  <TouchableOpacity
    style={{ flex: 1 }}
    activeOpacity={editing ? 1 : 0.5}
    onPress={onPress}
  >
    <View style={[{ opacity: editing ? 0.25 : 1 }]}>
      <Text style={{ fontSize: 48 }}>+</Text>
    </View>
  </TouchableOpacity>
))

/**
 * UUID
 */
const uuid = (): string => {
  // https://github.com/GoogleChrome/chrome-platform-analytics/blob/master/src/internal/identifier.js
  // const FORMAT: string = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";
  let chars = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.split('')
  for (let i = 0, len = chars.length; i < len; i++) {
    switch (chars[i]) {
      case 'x':
        chars[i] = Math.floor(Math.random() * 16).toString(16)
        break
      case 'y':
        chars[i] = (Math.floor(Math.random() * 4) + 8).toString(16)
        break
    }
  }
  return chars.join('')
}

/**
 * Style
 */
const styles = StyleSheet.create({
  delete: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteContainer: {
    width: 20,
    height: 20,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0009',
  },
  header: {
    position: 'absolute',
    width: '100%',
    backgroundColor: '#fffe',
    justifyContent: 'flex-end',
  },
  headerTitle: {
    position: 'absolute',
    width: '100%',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
  },
  headerItem: { fontSize: 18, color: 'gray' },
  headerContainer: {
    height: 60,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
})