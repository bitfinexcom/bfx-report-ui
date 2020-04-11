import React, { PureComponent, Fragment } from 'react'
import { withTranslation } from 'react-i18next'
import {
  Button,
  AnchorButton,
  Callout,
  Classes,
  Dialog,
  Intent,
  Position,
  Tooltip,
  Icon,
} from '@blueprintjs/core'
import { IconNames } from '@blueprintjs/icons'

import PairSelector from 'ui/PairSelector'
import Timeframe from 'ui/CandlesTimeframe'
import DateInput from 'ui/DateInput'
import mode from 'state/sync/constants'
import { platform } from 'var/config'

import { propTypes, defaultProps } from './CandlesSyncPref.props'

const MAX_OPTIONS = 5

class CandlesSyncPref extends PureComponent {
  static propTypes = propTypes

  static defaultProps = defaultProps

  constructor(props) {
    super(props)

    const { config } = props
    this.state = {
      isOpen: false,
      options: config.length ? config : [this.getDefaultOption()],
    }
  }

  componentDidUpdate(prevProps) {
    const { config } = this.props

    if (config !== prevProps.config) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        options: config.length ? config : [this.getDefaultOption()],
      })
    }
  }

  getDefaultOption = () => {
    const { defaultStartTime } = this.props
    return {
      symbol: 'BTC:USD',
      start: defaultStartTime,
      timeframe: '1h',
    }
  }

  handleOpen = (e) => {
    e.preventDefault()
    this.setState({ isOpen: true })
  }

  handleClose = (e) => {
    e.preventDefault()
    const { config } = this.props
    this.setState({
      isOpen: false,
      options: config.length ? config : [this.getDefaultOption()],
    })
  }

  handleApply = () => {
    const { options } = this.state
    const { editConfig } = this.props

    this.setState({ isOpen: false })
    editConfig(options)
  }

  onOptionAdd = () => {
    this.setState(({ options }) => ({
      options: [
        ...options,
        this.getDefaultOption(),
      ],
    }))
  }

  onOptionRemove = (index) => {
    const { options } = this.state

    // last option removal
    if (options.length === 1) {
      this.setState({
        options: [],
      })
      return
    }

    this.setState({
      options: options.filter((el, i) => i !== index),
    })
  }

  updateOption = (params) => {
    const { index, ...optionParams } = params
    const { options } = this.state

    const updatedOptions = options.map((option, i) => {
      if (i === index) {
        return {
          ...option,
          ...optionParams,
        }
      }

      return option
    })

    this.setState({
      options: updatedOptions,
    })
  }

  hasChanges = () => {
    const { config: currentOptions } = this.props
    const { options } = this.state

    const hasFilterValueChanged = options
      .some((option, index) => {
        const { symbol, timeframe, start } = option
        const currentOption = currentOptions[index] || {}

        return symbol !== currentOption.symbol
          || timeframe !== currentOption.timeframe
          || Math.floor(start / 1000) !== Math.floor(currentOption.start / 1000)
      })

    return currentOptions.length !== options.length || hasFilterValueChanged
  }

  canSave = () => {
    const { options } = this.state
    return !options.some(option => !option.start)
  }

  render() {
    const { syncMode, t } = this.props
    const { isOpen, options } = this.state

    if (!platform.showFrameworkMode) {
      return null
    }

    const hasChanges = this.hasChanges()
    const canSave = this.canSave()

    const renderInSyncWarning = syncMode === mode.MODE_SYNCING
      ? (
        <Fragment>
          <Callout intent={Intent.WARNING}>
            {t('preferences.sync.insync-warning')}
          </Callout>
          <br />
        </Fragment>
      )
      : null

    return (
      <Fragment>
        {' '}
        <Tooltip
          content={(
            <span>
              {t('preferences.sync.title')}
            </span>
          )}
          position={Position.TOP}
          usePortal={false}
        >
          <Button
            className='sync-pref-button'
            icon={IconNames.ISSUE_NEW}
            onClick={this.handleOpen}
            intent={Intent.PRIMARY}
          />
        </Tooltip>
        <Dialog
          icon={IconNames.ISSUE_NEW}
          onClose={this.handleClose}
          title={t('preferences.sync.title')}
          autoFocus
          canEscapeKeyClose
          canOutsideClickClose
          enforceFocus
          usePortal
          isOpen={isOpen}
        >
          <div className={Classes.DIALOG_BODY}>
            {renderInSyncWarning}

            {options.map((conf, index) => {
              const {
                symbol, start, timeframe,
              } = conf

              return (
                // eslint-disable-next-line react/no-array-index-key
                <div key={index} className='candles-sync-pref-item'>
                  <div className='candles-sync-pref-item-wrapper'>
                    <PairSelector
                      currentPair={symbol}
                      onPairSelect={val => this.updateOption({ index, symbol: val })}
                      buttonClassName='candles-sync-pref-item-pair'
                    />
                    <Timeframe
                      value={timeframe}
                      className='candles-sync-pref-item-timeframe'
                      onChange={val => this.updateOption({ index, timeframe: val })}
                    />
                    <div className='candles-sync-pref-item-date'>
                      <DateInput
                        onChange={val => this.updateOption({ index, start: val && val.getTime() })}
                        defaultValue={start}
                      />
                    </div>
                    <Icon
                      className='candles-sync-pref-item-remove'
                      icon={IconNames.SMALL_CROSS}
                      onClick={() => this.onOptionRemove(index)}
                    />
                  </div>
                </div>
              )
            })}

            {(options.length < MAX_OPTIONS) && (
              <div className='candles-sync-pref-add' onClick={this.onOptionAdd}>
                {`+ ${t('preferences.sync.add-pair')}`}
              </div>
            )}
          </div>
          <div className={Classes.DIALOG_FOOTER}>
            <div className={Classes.DIALOG_FOOTER_ACTIONS}>
              <Tooltip
                content={(
                  <span>
                    {t('preferences.sync.apply-tooltip')}
                  </span>
                )}
                position={Position.TOP}
                usePortal={false}
              >
                <AnchorButton
                  onClick={this.handleApply}
                  intent={Intent.PRIMARY}
                  disabled={(syncMode === mode.MODE_SYNCING || !hasChanges || !canSave)}
                >
                  {t('preferences.sync.btn-apply')}
                </AnchorButton>
              </Tooltip>
              <Button onClick={this.handleClose}>
                {t('preferences.close')}
              </Button>
            </div>
          </div>
        </Dialog>
      </Fragment>
    )
  }
}

export default withTranslation('translations')(CandlesSyncPref)
