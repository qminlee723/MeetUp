package com.meetup.backend.service.team;

import com.meetup.backend.dto.team.TeamResponseDto;
import org.json.JSONArray;

import java.util.List;

/**
 * created by myeongseok on 2022/10/21
 * updated by seungyong on 2022/10/27
 */
public interface TeamUserService {

    List<TeamResponseDto> getTeamByUser(String userId);

    void registerTeamUserFromMattermost(String mmSessionToken, JSONArray teamArray);

}
