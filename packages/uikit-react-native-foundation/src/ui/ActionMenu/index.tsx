import React from 'react';
import { Pressable, View } from 'react-native';

import createStyleSheet from '../../styles/createStyleSheet';
import useHeaderStyle from '../../styles/useHeaderStyle';
import useUIKitTheme from '../../theme/useUIKitTheme';
import DialogBox from '../Dialog/DialogBox';
import Modal from '../Modal';
import Text from '../Text';

export type ActionMenuItem = {
  title?: string;
  menuItems: { title: string; onPress?: () => void }[];
};

type Props = {
  visible: boolean;
  onHide: () => void;
  onError?: (error: unknown) => void;
  onDismiss?: () => void;
} & ActionMenuItem;
const ActionMenu: React.FC<Props> = ({ visible, onHide, onError, onDismiss, title, menuItems }) => {
  const { statusBarTranslucent } = useHeaderStyle();
  const { colors } = useUIKitTheme();
  // const [pending, setPending] = useState(false);
  // const _onHide = () => {
  //   if (!pending) onHide();
  // };

  return (
    <Modal
      onClose={onHide}
      onDismiss={onDismiss}
      statusBarTranslucent={statusBarTranslucent}
      visible={visible}
      backgroundStyle={{ alignItems: 'center', justifyContent: 'center' }}
    >
      <DialogBox>
        <View style={styles.title}>
          <Text
            h1
            color={colors.ui.dialog.default.none.text}
            numberOfLines={1}
            style={{ flex: 1 }}
            // style={{ maxWidth: pending ? '86%' : '100%' }}
          >
            {title}
          </Text>
          {/*{pending && (
            <ActivityIndicator
              size={'small'}
              color={colors.ui.dialog.default.none.highlight}
              style={{ width: '10%', marginLeft: '4%' }}
            />
          )}*/}
        </View>
        <View style={styles.buttonContainer}>
          {menuItems.map(({ title, onPress }, index) => {
            return (
              <Pressable
                key={title + index}
                style={styles.button}
                // disabled={pending}
                onPress={async () => {
                  try {
                    onPress?.();
                  } catch (e) {
                    onError?.(e);
                  } finally {
                    onHide();
                  }
                  // setPending(true);
                  // try {
                  //   await onPress?.();
                  //   onHide();
                  // } catch (e: unknown) {
                  //   onError?.(e);
                  // } finally {
                  //   setPending(false);
                  // }
                }}
              >
                <Text subtitle2 color={colors.ui.dialog.default.none.text} numberOfLines={1}>
                  {title}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </DialogBox>
    </Modal>
  );
};

const styles = createStyleSheet({
  title: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    paddingVertical: 20,
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 4,
    marginBottom: 8,
  },
  button: {
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
});

export default ActionMenu;
