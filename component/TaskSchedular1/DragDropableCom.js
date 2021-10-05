

import { createDndContext } from "react-native-easy-dnd";
const { Provider, Droppable, Draggable } = createDndContext();

const DraggableCom = ({children, ...props}) => {
    return (
        <View style={{
            position: 'absolute',
            x: 100,
            y: 200,
        }}>
            <Draggable
            onDragStart={() => {
                console.log('Started draggging');
            }}
            onDragEnd={(e) => {
                console.log(e);
            }}
            payload="my-draggable-item"
            >
            {({ viewProps }) => {
                return (
                <Animated.View
                    {...viewProps}
                    style={[viewProps.style, { width: 30, height: 40, backgroundColor: "red" }]}
                >
                    {children}
                </Animated.View>
                );
            }}
            </Draggable>
        </View>
    )
} 
const DroppableCom = ({children, ...props}) => {
    return (
        <Droppable
          onEnter={() => {
            console.log('Draggable entered');
          }}
          onLeave={() => {
            console.log('Draggable left');
          }}
          onDrop={({ payload, ...params }) => {
            console.log('Draggable with the following payload was dropped', params);
          }}
        >
          {({ active, viewProps }) => {
            return (
              <Animated.View
                {...viewProps}
                style={[
                  {
                    width: 200,
                    height: 40,
                    backgroundColor: active
                      ? "blue"
                      : "green"
                  },
                  viewProps.style,
                ]}
              >
                  {children}
              </Animated.View>
            );
          }}
        </Droppable>
    )
}