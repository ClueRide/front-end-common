import {LatLon} from "../lat-lon/lat-lon";
/**
 * Created by jett on 1/5/19.
 */
export class OutingView {
  id: number;
  scheduledTime: Date;
  startPin: LatLon;
  courseName: string;
  courseDescription: string;
  courseUrl: string;
  guideName: string;
  guideMemberId: number;
  teamName: string;
}
