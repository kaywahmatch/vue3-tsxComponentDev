declare enum TcPlayerErrorCode {
  /**
   * H5 提示的错误
   * - 提示语：网络错误，请检查网络配置或者播放链接是否正确。
   */
  H5_NETWORK_ERROR = 1,
  /**
   * 视频格式 Web 播放器无法解码。H5 提示的错误。
   * - 提示语：网络错误，请检查网络配置或者播放链接是否正确。
   */
  H5_DECODE_FAILED = 2,
  /**
   * H5 提示的错误。
   * - 提示语：视频解码错误。
   */
  H5_VIDEO_DECODE_ERROR = 3,
  /**
   * H5 提示的错误。
   * - 提示语：当前系统环境不支持播放该视频格式
   */
  H5_NOT_SUPPORT_ERROR = 4,
  /**
   * 播放器判断当前浏览器环境不支持播放传入的视频，可能是当前浏览器不支持 MSE 或者 Flash 插件未启用。
   * - 提示语：当前系统环境不支持播放该视频格式。
   */
  NOT_SUPPORT_ERROR_MSE_OR_FLASH = 5,
  /**
   * 不支持file协议
   * - 提示语：请勿在 file 协议下使用播放器，可能会导致视频无法播放。
   */
  NOT_SUPPORT_FILE_PROTOCOL = 10,
  /**
   * 参数有误
   * - 提示语：使用参数有误，请检查播放器调用代码。
   */
  INVALID_PARAMS = 11,
  /**
   * 没有填写播放链接
   * - 提示语：请填写视频播放地址。
   */
  NO_SRC = 12,
  /**
   * RTMP 正常播放过程中触发事件（NetConnection.Connect.Closed）。Flash 提示的错误。
   * - 提示语：直播已结束，请稍后再来。
   */
  FLASH_LIVE_END = 13,
  /**
   * 网络已断开（NetConnection.Connect.Closed）。Flash 提示的错误。
   * - 提示语：网络错误，请检查网络配置或者播放链接是否正确。
   */
  FLASH_NETWORK_ERROR = 1001,
  /**
   * 拉取播放文件失败（NetStream.Play.StreamNotFound），可能是服务器错误或者视频文件不存在。Flash 提示的错误。
   * - 提示语：获取视频失败，请检查播放链接是否有效。
   */
  FLASH_STREAM_NOT_FOUND = 1002,
  /**
   * Flash 提示的错误
   * - 提示语：
   * 获取视频失败，请检查播放链接是否有效。
   */
  FLASH_VIDEO_ERROR = 2032,
  /**
   * 请求 M3U8 文件失败，可能是网络错误或者跨域问题。Flash 提示的错误
   * - 提示语：无法加载视频文件，跨域访问被拒绝
   */
  FLASH_CORS_ERROR = 2048,
  /**
   * 播放 WebRTC 时设置 sdp 失败提示的错误
   * - 提示语：调用 WebRTC 接口失败
   */
  WEBRTC_SDP_ERROR = 2001,
  /**
   * 播放 WebRTC 时调用拉流接口失败提示的错误
   * - 提示语：调用拉流接口失败
   */
  WEBRTC_STREAM_ERROR = 2002,
  /**
   * 播放 WebRTC 时提示的错误，可用于确定是否为停止推流状态
   * - 提示语：连接服务器失败，并且连接重试次数已超过设定值
   */
  WEBRTC_CONNECT_ERROR = 2003,
}

declare class TcPlayer {
  constructor(el: string, options: TcPlayerOptions);
  /** 开始播放视频 */
  play(): void;
  /** 暂停播放视频。 */
  pause(): void;
  /** 切换视频播放状态 。 */
  togglePlay(): void;
  /** 切换静音状态，不传参则返回当前是否静音。 */
  mute(muted: boolean): boolean;
  /**
   * 设置音量，不传参则返回当前音量 。
   * - 范围：0到1
   */
  volume(val?: number): number;
  /** 返回是否在播放中 */
  playing(): boolean;
  /**
   * 获取视频时长 。
   * - 备注：只适用于点播，需要在触发 loadedmetadata 事件后才可获取视频时长
   */
  duration(): number;
  /**
   * 设置视频播放时间点，不传参则返回当前播放时间点 。
   * - 备注：只适用于点播
   */
  currentTime(time?: number): number;
  /**
   * 调用全屏接口(Fullscreen API)，不支持全屏接口时使用伪全屏模式，不传参则返回值当前是否是全屏。
   * - （备注：移动端系统全屏没有提供 API，也无法获取系统全屏状态 ）
   */
  fullscreen(enter?: boolean): boolean;
  /**
   * 获取视频缓冲数据百分比。
   * - （备注：只适用于点播）
   */
  buffered(): number;
  /**
   * 销毁播放器实例[v2.2.1+]。
   */
  destroy(): void;
  /**
   * 切换清晰度，传值 "od"、"hd"、"sd" [v2.2.1+]。
   */
  switchClarity(clarity: TcClarity): void;
  /**
   * 通过视频地址加载视频。
   * - （备注：该方法只能加载对应播放模式下支持的视频格式，Flash 模式支持切换 RTMP、FLV、HLS 和 MP4 ，H5 模式支持 MP4、HLS 和 FLV（HLS、FLV 取决于浏览器是否支持） [v2.2.2+]）
   */
  load(url: string): void;
}

declare interface TcPlayerOptions {
  /**
   * 原画 WebRTC 播放 URL。
   */
  webrtc?: string;
  /**
   * 高清 WebRTC 播放 URL。
   */
  webrtc_hd?: string;
  /**
   * 标清 WebRTC 播放 URL。
   */
  webrtc_sd?: string;
  /** 原画 M3U8 播放 URL */
  m3u8?: string;
  /** 高清 M3U8 播放 URL */
  m3u8_hd?: string;
  /** 标清 M3U8 播放 URL */
  m3u8_sd?: string;

  /** 原画 FLV 播放 URL */
  flv?: string;
  /** 高清 FLV 播放 URL */
  flv_hd?: string;
  /** 标清 FLV 播放 URL */
  flv_sd?: string;

  /** 原画 MP4 播放 URL */
  mp4?: string;
  /** 高清 MP4 播放 URL */
  mp4_hd?: string;
  /** 标清 MP4 播放 URL */
  mp4_sd?: string;

  /** 原画 RTMP 播放 URL */
  rtmp?: string;
  /** 高清 RTMP 播放 URL */
  rtmp_hd?: string;
  /** 标清 RTMP 播放 URL */
  rtmp_sd?: string;

  /** 设置播放器宽度，单位为像素 */
  width: number | string;
  /** 设置播放器高度，单位为像素 */
  height: number | string;
  /** 设置初始音量，范围：0到1 [v2.2.0+] */
  volume?: number;

  /** 设置视频是否为直播类型，将决定是否渲染时间轴等控件，以及区分点直播的处理逻辑，default: false */
  live?: boolean;
  /**
   * - 是否自动播放，default: false
   * - 备注：该选项只对大部分 PC 平台生效
   */
  autoplay?: boolean;

  /** 预览封面 */
  poster?:
    | string
    | {
        src: string;
        style?: TcPosterStyle;
      };
  controls?: TcControls;
  /** 开启后，在不支持 Fullscreen API 的浏览器环境下，尝试使用浏览器提供的 webkitEnterFullScreen 方法进行全屏，如果支持，将进入系统全屏，控件为系统控件 */
  systemFullscreen?: boolean;

  /**
   * 是否优先使用 Flash 播放视频。
   * （备注：该选项只对 PC 平台生效[v2.2.0+]）<br>
   * 默认true
   */
  flash?: boolean;
  /** 可以设置 flash swf url */
  flashUrl?: string;

  /**
   * 是否启用 flv.js 的播放 flv。启用时播放器将在支持 MSE 的浏览器下，采用 flv.js 播放 flv，然而并不是所有支持 MSE 的浏览器都可以使用 flv.js，所以播放器不会默认开启这个属性，[v2.2.0+]
   */
  h5_flv?: boolean;
  /**
   * 是否启用 TBS 的播放 flv 或 hls 。启用时播放器将在 TBS 模式下(例如 Android 的微信、QQ 浏览器），将 flv 或 hls 播放地址直接赋给 <video> 播放。TBS 视频能力 [v2.2.0+]
   */
  x5_player?: boolean;
  /**
   * 通过 video 属性 “x5-video-player-type” 声明启用同层 H5 播放器，支持的值：H5 (该属性为 TBS 内核实验性属性，非 TBS 内核不支持)，TBS H5 同层播放器接入规范
   */
  x5_type?: string;
  /**
   * 通过 video 属性 “x5-video-player-fullscreen” 声明视频播放时是否进入到 TBS 的全屏模式，支持的值：true (该属性为 TBS 内核实验性属性，非 TBS 内核不支持)
   */
  x5_fullscreen?: boolean;
  /** 通过 video 属性 “x5-video-orientation” 声明 TBS 播放器支持的方向，可选值：0（landscape 横屏），1：（portraint竖屏），2：（landscape | portrait 跟随手机自动旋转）。 (该属性为 TBS 内核实验性属性，非 TBS 内核不支持) [v2.2.0+] */
  x5_orientation?: number;

  /** 自定义文案 */
  wording?: { [code: number]: string };

  /** 默认播放清晰度[v2.2.1+]。 */
  clarity?: TcClarity;
  /** 自定义清晰度文案 [v2.2.1+] */
  clarityLabel?: TcClarityLabel;
  listener?: Listener;

  /** 暂停时显示封面[v2.3.0+] */
  pausePosterEnabled?: boolean;

  /** 配置 video 标签的 preload 属性，只有部分浏览器生效[v2.3.0+] */
  preload?: 'auto' | 'metadata' | 'none';

  /** hls.js 初始化配置项[v2.3.0+] */
  hlsConfig?: Recordable;
  /** flv.js 初始化配置项[v2.3.1+] */
  flvConfig?: Recordable;
  /**
   * WebRTC 初始化配置项 [v2.4.1+]。
   * 支持通过 streamType 指定拉流类型，默认拉取音视频，可选单独拉取视频或单独拉取音频，streamType 可选属性：
   * - auto：拉取视频流和音频流
   * - video：仅拉取视频流
   * - audio：仅拉取音频流
   */
  webrtcConfig?: Recordable;
}

/**
 * - default 居中1：1显示。
 * - stretch 拉伸铺满播放器区域，图片可能会变形。
 * - cover 优先横向等比拉伸铺满播放器区域，图片某些部分可能无法显示在区域内
 */
type TcPosterStyle = 'default' | 'stretch' | 'cover';

/**
 * default 显示默认控件，none 不显示控件，system 移动端显示系统控件
 * 备注：如果需要在移动端使用系统全屏，就需要设置为 system。默认全屏方案是使用 Fullscreen API + 伪全屏的方式
 * http://imgcache.qq.com/open/qcloud/video/vcplayer/demo/tcplayer-consoles.html
 */
type TcControls = 'default' | 'none' | 'system';

type TcClarity = 'od' | 'hd' | 'sd';
interface TcClarityLabel {
  od?: string;
  hd?: string;
  sd?: string;
}

type Listener = (msg: TcEvent) => void;

declare interface TcEvent {
  /** 事件类型 */
  type: TcListenerEvents;
  /** 事件源对象，即播放器实例，HTML5 或者 Flash */
  src: any;
  /** 事件触发时的 UTC 时间戳 */
  ts: number;
  /** Event 实例的时间戳 */
  timeStamp: number;
  detail?: Recordable;
}

type TcListenerEvents =
  | 'error'
  | 'timeupdate'
  | 'load'
  | 'loadedmetadata'
  | 'loadeddata'
  | 'progress'
  | 'fullscreen'
  | 'play'
  | 'playing'
  | 'pause'
  | 'ended'
  | 'seeking'
  | 'seeked'
  | 'resize'
  | 'volumechange'
  | 'webrtcstatupdate'
  | 'webrtcwaitstart'
  | 'webrtcwaitend'
  | 'webrtcstop';
