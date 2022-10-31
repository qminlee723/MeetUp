package com.meetup.backend.service.meeting;

import com.meetup.backend.dto.schedule.meeting.MeetingRequestDto;
import com.meetup.backend.dto.schedule.meeting.MeetingResponseDto;
import com.meetup.backend.dto.schedule.meeting.MeetingUpdateRequestDto;

import java.util.List;

/**
 * created by seongmin on 2022/10/23
 */
public interface MeetingService {
    MeetingResponseDto getMeetingResponseDtoById(String userId, Long meetingId);
    List<MeetingResponseDto> getMeetingResponseDtoByUserAndDate(String loginUserId, String date);

    List<MeetingResponseDto> getMeetingResponseDtoByUserAndDate(String loginUserId, String getUserId, Long meetupId, String date);

    void createMeeting(String userId, MeetingRequestDto meetingRequestDto);

    void updateMeeting(String userId, MeetingUpdateRequestDto meetingUpdateRequestDto);

    void deleteMeeting(String userId, Long meetingId);
}
