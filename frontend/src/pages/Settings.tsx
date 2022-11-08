import Layout from '../components/layout/Layout';
import { useState, useEffect } from 'react';
import { axiosInstance } from '../components/auth/axiosConfig';
import Alert from '@mui/material/Alert';
import Switch from '@mui/material/Switch';

interface Team {
  displayName: string;
  id: string;
  isActivate: boolean;
}

function Settings() {
  const [url, setUrl] = useState<string>('Webex Link');
  const [input, setInput] = useState<object>({ webexUrl: '' });
  const [done, setDone] = useState<boolean>(false);
  const [teamArray, setTeamArray] = useState<Team[]>([]);
  const [forUse, setForUse] = useState<Team[]>([]);

  useEffect(() => {
    setForUse([...teamArray]);
  }, [teamArray]);

  useEffect(() => {
    axiosInstance.get('/user/webex').then((res) => {
      if (res.status === 200) {
        if (res.data.webexUrl === null) {
          setUrl('Webex Link');
        } else {
          setUrl(res.data.webexUrl);
        }
      }
    });

    axiosInstance.get('meetup/team/activate').then((res) => {
      setTeamArray(res.data);
    });
  }, []);

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  useEffect(() => {
    setInput({ webexUrl: url });
  }, [url]);

  const submit = () => {
    axiosInstance.put('/user/webex', input).then((res) => {
      if (res.status === 201) {
        setDone(true);
      }
    });
  };

  useEffect(() => {
    // 기타 오류 안내는 10초 뒤에 사라짐
    const timer = setTimeout(() => {
      setDone(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [done]);

  const handleChange = (id: string) => {
    axiosInstance.put('/meetup/team/activate', [{ teamId: id }]).then((res) => {});
  };

  const buttonChange = (i: number) => {
    forUse[i].isActivate = !forUse[i].isActivate;
    setForUse([...forUse]);
  };

  return (
    <Layout>
      <div className="relative text-m mx-[20vw] pt-[20vh] pb-[180px]">
        {/* 웹엑스 주소 관리*/}
        <div>
          <div className="flex items-center">
            <div className="font-bold text-title">나의 Webex 주소 관리</div>
            <button
              onClick={submit}
              className="ml-3 w-[80px] h-[23px] bg-background border-title border-solid border-[2px] text-[13px] drop-shadow-shadow rounded font-bold text-title align-middle"
            >
              저장
            </button>
          </div>
          <input
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                submit();
              }
            }}
            onChange={onInput}
            type="text"
            placeholder={url}
            className="w-full text-center placeholder-label border-b-2 border-b-title py-1 px-2 mb-4 focus:outline-none focus:border-b-footer"
          />
          {done ? (
            <div className="absolute w-full">
              <Alert severity="success">저장이 완료되었습니다.</Alert>
            </div>
          ) : (
            ''
          )}
        </div>

        {/* 팀 비활성화 */}
        <div>
          <div className="flex mt-[8vh]">
            <div className="font-bold text-title">내가 사용할 팀 관리</div>
          </div>
          <div className="mt-3 grid grid-rows-4 grid-flow-col">
            {teamArray.map((team, index: number) => (
              <div key={index} className="flex my-1">
                <div className="text-s w-2/3 cursor-default">{team.displayName}</div>
                <div
                  onClick={() => {
                    handleChange(team.id);
                  }}
                >
                  <Switch
                    id={team.id}
                    onChange={() => {
                      buttonChange(index);
                    }}
                    checked={team.isActivate}
                    inputProps={{ 'aria-label': 'controlled' }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Settings;
